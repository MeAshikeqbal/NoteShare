import { IconBadge } from "@/components/icon-badge";
import { db } from "@/lib/db";
import { Files, LayoutDashboard, ListChecks } from "lucide-react";
import { redirect } from "next/navigation";
import { TitleForm } from "./_components/title-form";
import { DiscriptionForm } from "./_components/description-form";
import { ImageForm } from "./_components/image-form";
import { CategoryForm } from "./_components/category-form";
import { AttachmentForm } from "./_components/attachment-form";
import { ChaptersForm } from "./_components/chapters-form";
import { currentUser } from "@/lib/auth";
import { Banner } from "@/components/banner";
import { Action } from "./_components/course-action";


const CourseSetupPage = async ({
    params
}: {
    params: {
        courseId: string;
    }
}) => {

    const session = await currentUser();
    const userId = session?.id;

    if (!userId) {
        return redirect("/login");
    }

    if (!params.courseId) {
        return redirect("/courses/teacher");
    }

    if (session?.role !== "TEACHER") {
        return redirect("/courses");
    }

    const course = await db.course.findUnique({
        where: {
            id: params.courseId,
            userId
        },
        include: {
            Chapters: {
                orderBy: {
                    position: "asc"
                }
            },
            attachments: {
                orderBy: {
                    createdAt: "desc"
                }
            }
        }
    })

    if (!course) {
        return redirect("/courses");
    }

    const teacherid = course.userId;

    if (teacherid !== userId) {
        return redirect("/courses/teacher");
    }

    const catagories = await db.catagory.findMany({
        orderBy: {
            name: "asc"
        }
    })


    const requiredFields = [
        course.title,
        course.description,
        course.image,
        course.catagoryId,
        course.Chapters.some(chapter => chapter.isPublished)
    ];

    const totalFields = requiredFields.length;
    const compleatedFields = requiredFields.filter(Boolean).length;
    const compleationText = `(${compleatedFields}/${totalFields})`;

    const isCompleated = requiredFields.every(Boolean);

    return (
        <>
            {!course.isPublished && (
                <Banner
                    label="Your course is not published yet.It will be visible to students once you publish it."
                />
            )}
            <div
                className="p-6"
            >
                <div
                    className="flex justify-between items-center"
                >
                    <div
                        className="flex flex-col gap-y-2"
                    >
                        <h1
                            className="text-2xl font-medium"
                        >
                            Course Setup
                        </h1>
                        <span
                            className="text-sm text-slate-600"
                        >
                            Compleate all the required fields
                            {compleationText}
                        </span>
                    </div>
                    <Action
                    disabled={!isCompleated}
                    courseId={params.courseId}
                    isPublished={course.isPublished}
                    />
                </div>
                <div
                    className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16"
                >
                    <div>
                        <div
                            className="flex items-center gap-x-2"
                        >
                            <IconBadge
                                icon={LayoutDashboard}
                            />
                            <h2
                                className="text-xl"
                            >
                                Coustomise your course
                            </h2>
                        </div>
                        <TitleForm
                            initialData={course}
                            courseId={course.id}
                        />
                        <DiscriptionForm
                            initialData={course}
                            courseId={course.id}
                        />
                        <ImageForm
                            initialData={course}
                            courseId={course.id}
                        />
                        <CategoryForm
                            initialData={course}
                            courseId={course.id}
                            options={catagories.map((category) => ({
                                label: category.name,
                                value: category.id,
                            }))}
                        />
                    </div>
                    <div
                        className="space-y-6"
                    >
                        <div>
                            <div
                                className="flex items-center gap-x-2"
                            >
                                <IconBadge
                                    icon={ListChecks}
                                />
                                <h2>
                                    Course chapters
                                </h2>
                            </div>
                            <ChaptersForm
                                initialData={{ ...course, chapters: course.Chapters }}
                                courseId={course.id}
                            />
                        </div>
                        <div
                            className="flex items-center gap-x-2"
                        >
                            <IconBadge
                                icon={Files}
                            />
                            <h2
                                className="text-xl"
                            >
                                Resources & Attachmentes
                            </h2>
                        </div>
                        <AttachmentForm
                            initialData={course}
                            courseId={course.id}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default CourseSetupPage;
import { auth } from "@/auth";
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


const SingleCoursePage = async ({
    params
}: {
    params: {
        courseId: string;
    }
}) => {

    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
        return redirect("/login");
    }

    if (!params.courseId) {
        return redirect("/courses/teacher");
    }

    if (session?.user?.role !== "TEACHER") {
        return redirect("/courses");
    }

    const course = await db.course.findUnique({
        where: {
            id: params.courseId,
            userId
        },
        include: {
            Chapters:{
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
        course.isPublished,
        course.catagoryId,
        course.Chapters.some(chapter => chapter.isPublished)
    ];

    const totalFields = requiredFields.length;
    const compleatedFields = requiredFields.filter(Boolean).length;

    const compleationText = `(${compleatedFields}/${totalFields})`;

    return (
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
                        options={catagories.map((catagory) => ({
                            label: catagory.name,
                            value: catagory.id
                        }))
                        }
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
                            initialData={course}
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
    );
}

export default SingleCoursePage;
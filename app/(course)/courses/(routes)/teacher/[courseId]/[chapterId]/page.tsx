import { IconBadge } from "@/components/icon-badge";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { ArrowLeft, Eye, File, LayoutDashboard, Video } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { TitleForm } from "./_components/title-form";
import { DiscriptionForm } from "./_components/description-form";
import { VideoForm } from "./_components/video-form";
import { AttachmentForm } from "./_components/attachment-form";
import { Banner } from "@/components/banner";
import { ChapterAction } from "./_components/chapter-action";
import { ChapterAccessForm } from "./_components/chapter-access-form";

const ChapterIdPage = async ({
    params
}: {
    params: {
        courseId: string;
        chapterId: string;
    }
}) => {
    const session = await currentUser();
    const userId = session?.id;

    if (!userId) {
        return redirect("/login");
    }
    const chapter = await db.chapter.findUnique({
        where: {
            id: params.chapterId,
            courseId: params.courseId
        },
        include: {
            muxData: true,
            attachments: {
                orderBy: {
                    createdAt: "desc"
                }
            }

        }
    })

    if (!chapter) {
        return redirect(`/courses/teacher/course/${params.courseId}`)
    }

    const requiredFields = [
        chapter.title,
        chapter.description,
        chapter.videoUrl,
    ]

    const totalFields = requiredFields.length;
    const completedFields = requiredFields.filter(Boolean).length;
    const compleationText = `${completedFields}/${totalFields}`
    const isCompleted = requiredFields.every(Boolean);

    return (
        <>
            {!chapter.isPublished && (
                <Banner
                    variant="warning"
                    label="This chapter is not published. Students can't see this chapter"
                />
            )}
            <div
                className="p-6"
            >
                <div
                    className="flex justify-between items-center"
                >
                    <div
                        className="w-full"
                    >
                        <Link
                            href={`/courses/teacher/${params.courseId}`}
                            className="flex items-center text-center hover:opacity-75 transition mb-6"
                        >
                            <ArrowLeft
                                className="mr-2 h-4 w-4"
                            />
                            Back to Course Setup
                        </Link>
                        <div
                            className="flex items-center justify-between w-full"
                        >
                            <div
                                className="flex flex-col gap-y-2"
                            >
                                <h1
                                    className="text-2xl font-medium"
                                >
                                    Chapter Creation
                                </h1>
                                <span
                                    className="text-sm text-slate-600"
                                >
                                    Compleate all fields {compleationText}
                                </span>
                            </div>
                            <ChapterAction
                                disabled={!isCompleted}
                                courseId={params.courseId}
                                chapterId={params.chapterId}
                                isPublished={chapter.isPublished}
                            />
                        </div>
                    </div>
                </div>
                <div
                    className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16"
                >
                    <div
                        className="space-y-4"
                    >
                        <div>
                            <div
                                className="flex items-center gap-x-2"
                            >
                                <IconBadge
                                    icon={LayoutDashboard}
                                />
                                <h2>
                                    Coustomize Chapter
                                </h2>
                            </div>
                            <TitleForm
                                initialData={chapter}
                                courseId={params.courseId}
                                chapterId={params.chapterId}
                            />
                            <DiscriptionForm
                                initialData={chapter}
                                courseId={params.courseId}
                                chapterId={params.chapterId}
                            />
                        </div>
                        <div>
                            <div
                                className="flex items-center gap-x-2"
                            >
                                <IconBadge
                                    icon={File}
                                />
                                <h2
                                    className="text-xl "
                                >
                                    Resources & Attachments
                                </h2>
                            </div>
                            <AttachmentForm
                                initialData={chapter}
                                courseId={params.courseId}
                                chapterId={params.chapterId}
                            />
                        </div>
                    </div>
                    <div>
                        <div
                            className="flex items-center gap-x-2"
                        >
                            <IconBadge
                                icon={Video}
                            />
                            <h2
                                className="text-xl "
                            >
                                Chapter Video
                            </h2>
                        </div>
                        <VideoForm
                            initialData={chapter}
                            courseId={params.courseId}
                            chapterId={params.chapterId}
                        />
                        <div
                            className="mt-7"
                        >
                            <div className="flex items-center gap-x-2">
                                <IconBadge icon={Eye} />
                                <h2 className="text-xl">
                                    Access Settings
                                </h2>
                            </div>
                            <ChapterAccessForm
                                initialData={chapter}
                                courseId={params.courseId}
                                chapterId={params.chapterId}
                            />
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}

export default ChapterIdPage;

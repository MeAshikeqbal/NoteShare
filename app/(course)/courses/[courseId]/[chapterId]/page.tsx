import { getChapter } from "@/actions/courses/get-chapter";
import { Banner } from "@/components/banner";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { VideoPlayer } from "./_components/video-player";

const ChapterIdPaga = async ({
    params
}: {
    params: {
        courseId: string;
        chapterId: string;
    }

}) => {

    const user = await currentUser()
    const userId = user?.id

    if (!userId) {
        return redirect("/login");
    }

    const {
        chapter,
        course,
        muxData,
        attachments,
        nextChapter,
        userProgress,
        subscribedCourse
    } = await getChapter({
        courseId: params.courseId,
        chapterId: params.chapterId,
        userId: userId
    })

    if (!chapter || !course) {
        return redirect("/courses")
    }

    const isLocked = !subscribedCourse && !chapter.isIntro
    const completeOnEnd = !!subscribedCourse && !userProgress?.isCompleted


    return (
        <div>
            {userProgress?.isCompleted && (
                <Banner
                    label="You have completed this Chapter🎉"
                    variant="success"
                />
            )}
            {isLocked && (
                <Banner
                    label="You need to subscribe to this course to access this chapter"
                    variant="warning"
                />
            )}
            <div
                className="flex flex-col max-w-4xl mx-auto pb-20"
            >
                <div
                    className="p-4"
                >
                    <VideoPlayer
                        chapterId={params.chapterId}
                        title={chapter.title}
                        courseId={params.courseId}
                        nextChapterId={nextChapter?.id}
                        playbackId={muxData?.playbackId!}
                        isLocked={isLocked}
                        completeOnEnd={completeOnEnd}
                    />
                </div>
            </div>
        </div>
    );
}

export default ChapterIdPaga;
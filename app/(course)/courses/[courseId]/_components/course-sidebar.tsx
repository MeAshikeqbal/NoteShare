import { currentUserId } from "@/lib/auth";
import { db } from "@/lib/db";
import { Course, Chapter, UserProgress } from "@prisma/client"
import { redirect } from "next/navigation";
import { CourseSidebarItem } from "./course-sidebar-item";

interface CourseSidebarProps {
    course: Course & {
        Chapters: (Chapter & {
            userProgress: UserProgress[] | null
        })[]
    };
    progressCount: number;
}



export const CourseSidebar = async ({
    course,
    progressCount
}: CourseSidebarProps) => {
    const userId = await currentUserId()

    if (!userId) {
        return redirect('/login')
    }

    const subscribed = await db.subscription.findUnique({
        where: {
            userId_courseId: {
                courseId: course.id,
                userId: userId
            }
        }
    })



    return (
        <div
            className="h-full border-r flex flex-col overflow-y-auto shadow-sm"
        >
            <div
                className="flex p-8 flex-col border-b"
            >
                <h1
                    className="font-semibold"
                >
                    {course.title}
                </h1>
                {/*Chack subscription and add progress */}
            </div>
            <div
                className="flex flex-col w-full"
            >
                {course.Chapters.map((chapter) => (
                    <CourseSidebarItem
                        key={chapter.id}
                        id={chapter.id}
                        lable={chapter.title}
                        isCompleted={!!chapter.userProgress?.[0]?.isCompleted}
                        courseId={course.id}
                        isLocked={!subscribed}
                    />
                ))}
            </div>
        </div>
    )
}
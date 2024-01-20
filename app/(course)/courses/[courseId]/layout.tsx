import { getProgress } from "@/actions/courses/get-progress"
import { currentUser, currentUserId } from "@/lib/auth"
import { db } from "@/lib/db"
import { redirect } from "next/navigation"
import { CourseSidebar } from "./_components/course-sidebar"
import { CourseNavbar } from "./_components/course-navbar"

const CourseLayout = async ({
    children,
    params
}: {
    children: React.ReactNode
    params: {
        courseId: string
    }
}) => {
    const user = await currentUser()
    const userId = user?.id
    const courseId = params.courseId

    const course = await db.course.findUnique({
        where: {
            id: courseId
        },
        include:{
            Chapters: {
                where:{
                    isPublished: true
                },
                include:{
                    userProgress:{
                        where:{
                            userId: userId
                        }
                    }
                },
                orderBy:{
                    position: 'asc'
                }
            }     
        }
    })

    if (!course) {
        return redirect('/not-found')
    }

    if(!userId){
        return redirect('/login')
    }

    const progressCount = await getProgress(userId, course.id )

    return (
        <div
        className="h-full"
        >
            <div
            className="h-[80px] md:pl-80 fixed inset-y-0 w-full z-50"
            >
                <CourseNavbar
                    course={course}
                    progressCount={progressCount}
                />
            </div>
            <div
            className="hidden md:flex h-full w-80 flex-col fixed inset-y-0 z-50"
            >
                <CourseSidebar
                    course={course}
                    progressCount={progressCount}
                />
            </div>
            <main
            className="md:pl-80 h-full pt-[80px]"
            >
            {children}
            </main>
        </div>
    );
}

export default CourseLayout;
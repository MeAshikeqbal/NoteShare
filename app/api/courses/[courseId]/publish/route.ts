import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
    req:Request,
    {params} : {params: {courseId: string}}
){
    try {
        const user = await currentUser();
        const userRole = user?.role;
        const { courseId } = params;
    
        if (userRole !== "TEACHER") {
          return new NextResponse("Unauthorized", { status: 401 });
        }
    
        if (!user) {
          return new NextResponse("Unauthorized", { status: 401 });
        }
        if (!courseId) {
          return new NextResponse("Bad Request", { status: 400 });
        }

        const course= await db.course.findUnique({
            where:{
                id:params.courseId,
                userId:user.id,
            },
            include:{
                Chapters:{
                    include:{
                        muxData:true,
                    }
                }
            }
        })

        if(!course){
            return new NextResponse("Not Found", { status: 404 });
        }

        const hasPublishedChapters = course.Chapters.some((chapter)=>chapter.isPublished)
        
        if (!course.title||!course.description ||!course.Chapters.length||!hasPublishedChapters || !course.image ||!course.catagoryId) {
            return new NextResponse("Missing required fields", { status: 401 });
        }

        const publishedCourse = await db.course.update({
            where:{
                id:params.courseId,
                userId:user.id,
            },
            data:{
                isPublished:true,
            }
        })

        return NextResponse.json(publishedCourse, { status: 200 });
    
    } catch (error) {
        console.log("[COURSE_PUBLISH] error", error)
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
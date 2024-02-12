import { NextResponse } from "next/server"
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";


export async function POST(
    req: Request, 
    { params }: { params: { courseId: string; chapterId: string; } }
    ) {
        try {
            const user = await currentUser();
            const userRole = user?.role;
            const {url} = await req.json();
 
            if (userRole !== "TEACHER") {
              return new NextResponse("Unauthorized", { status: 401 });
            }
        
            if (!user) {
              return new NextResponse("Unauthorized", { status: 401 });
            }
            if (!url) {
              return new NextResponse("Bad Request", { status: 400 });
            }

            const courseOwner = await db.chapter.findUnique({
                where: {
                    id: params.chapterId,
                    courseId: params.courseId,
                }
            })
            if (!courseOwner) {
                return new NextResponse("Unauthorized", { status: 401 });
            }
            const chapter = await db.chapter.findUnique({
                where: {
                    id: params.chapterId,
                    courseId: params.courseId,
                }
            })
            if (!chapter) {
                return new NextResponse("Unauthorized", { status: 401 });
            }

            
            const attachment = await db.chapterAttachment.create({
                data: {
                    url,
                    name: url.split("/").pop(),
                    chapterId: params.chapterId
                }
            })
            return NextResponse.json(attachment, { status: 201 })

        } catch (error) {
            console.log("COURSE_ATTACHMENTS",error)
            return new NextResponse("Internal Error", { status: 500 })
        }
}
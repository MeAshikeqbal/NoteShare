import { NextResponse} from "next/server"
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";


export async function POST (
    req: Request,
    {params} :{
        params: {
            courseId: string
        }
    }
){
    try {
        const user = await currentUser();

        if(!user || !user.id){
            return new NextResponse("Unauthorized", {status: 401})
        }

        const course = await db.course.findUnique({
            where: {
                id: params.courseId,
                isPublished: true
            }
        })

        const subscription = await db.subscription.findUnique({
            where: {
                userId_courseId: {
                    courseId: params.courseId,
                    userId: user.id
                }
            }
        })

        if(subscription){
            return new NextResponse("Already subscribed", {status: 400})
        }

        if(!course){
            return new NextResponse("Not found", {status: 404})
        }

        if(!subscription){
            await db.subscription.create({
                data: {
                    user: {
                        connect: {
                            id: user.id
                        }
                    },
                    course: {
                        connect: {
                            id: course.id
                        }
                    }
                }
            })
        }

        const newSubscription = await db.subscription.findFirst({
            where: {
                userId: user.id,
                courseId: course.id
            }
        })
    
        if(newSubscription) {
            console.log('Subscription successful');
        } else {
            console.log('Subscription failed');
        }
        return new NextResponse("OK", {status: 200})

    } catch (error) {
        console.log("[Courceid_chackout] [POST] error - ", error)
        return new NextResponse("Internal Server Error", {status: 500})
    }
}
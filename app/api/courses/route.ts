import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
  try {
    const user = await currentUser()
    const userRole = user?.role
    if (userRole !== "TEACHER") {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const {title } = await req.json();
    if (!title) {
      return new NextResponse("Bad Request", { status: 400 });
    }

    const course = await db.course.create({
        data:{
            title,
            userId: user.id
        }
    })

    return NextResponse.json(course, { status: 201 });

  } catch (error) {
    console.log("[COURSES]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

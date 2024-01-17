import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } }
) {
  try {
    const user = await currentUser();
    const userRole = user?.role;
    const { courseId } = params;
    const {isPublished, ...data} = await req.json();

    if (userRole !== "TEACHER") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!courseId) {
      return new NextResponse("Bad Request", { status: 400 });
    }
    if (!data) {
      return new NextResponse("Bad Request", { status: 400 });
    }

    const courseOwner = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId: user.id,
      },
    });

    if (!courseOwner) {
      return new NextResponse("Unauthorized", { status: 401 });
    }


    const chapter = await db.chapter.update({
      where: {
        id: params.chapterId,
        courseId: params.courseId,
      },
      data: {
        ...data,
      },
    });

    //handle video upload

    return NextResponse.json(chapter, { status: 200 });
  } catch (error) {
    console.log("Chapter PATCH error: ", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}

import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: { courseId: string } },
) {
  try {
    const user = await currentUser();
    const userRole = user?.role;
    const { courseId } = params;
    const { list } = await req.json();

    if (userRole !== "TEACHER") {
      return new NextResponse("Forbidden", { status: 403 });
    }

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!courseId) {
      return new NextResponse("Bad Request", { status: 400 });
    }
    if (!list) {
      return new NextResponse("Bad Request", { status: 400 });
    }

    const courseOwner = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId: user.id,
      },
    });

    if (!courseOwner) {
      return new NextResponse("Forbidden", { status: 403 });
    }

    for (let item of list) {
      await db.chapter.update({
        where: {
          id: item.id,
        },
        data: {
          position: item.position,
        },
      });
    }

    return new NextResponse("Sucess", { status: 200 });
  } catch (error) {
    console.log("Course Chapters Reorder PUT:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

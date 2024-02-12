import { NextResponse } from "next/server";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";

export async function DELETE(
  req: Request,
  {
    params,
  }: { params: { courseId: string; attachmentsId: string; chapterId: string } },
) {
  try {
    const user = await currentUser();
    const userRole = user?.role;
    const { courseId, attachmentsId, chapterId } = params;

    if (userRole !== "TEACHER") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!courseId) {
      return new NextResponse("Bad Request", { status: 400 });
    }
    if (!attachmentsId) {
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

    const chapter = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId: user.id,
      },
    });
    if (!chapter) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const attachment = await db.chapterAttachment.delete({
      where: {
        chapterId: params.chapterId,
        id: params.attachmentsId,
      },
    });

    return NextResponse.json(attachment, { status: 201 });
  } catch (error) {
    console.log("attachments_id", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

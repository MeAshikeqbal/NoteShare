import { NextResponse } from "next/server";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";

export async function DELETE(
  req: Request,
  { params }: { params: { courseId: string; attachmentsId: string } }
) {
  try {
    const user = await currentUser();
    const userRole = user?.role;
    const { courseId, attachmentsId } = params;

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
        id: courseId,
        userId: user.id,
      },
    });
    if (!courseOwner) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const course = await db.course.findUnique({
      where: {
        id: courseId,
        userId: user.id,
      },
    });
    if (!course) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const attachment = await db.attachment.delete({
      where: {
        courseId: params.courseId,
        id: params.attachmentsId,
      },
    });

    return NextResponse.json(attachment, { status: 201 });
  } catch (error) {
    console.log("attachments_id", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

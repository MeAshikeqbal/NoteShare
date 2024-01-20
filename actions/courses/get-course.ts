import { Catagory, Course } from "@prisma/client";
import { getProgress } from "./get-progress";
import { db } from "@/lib/db";

type CourseWithProgressWithCategory = Course & {
  progress: number|null;
  catagory: Catagory | null;
  chapters: { id: string }[];
};

type GetCourses = {
  userId: string;
  title?: string;
  catagoryId?: string;
};

export const getCourses = async ({
  userId,
  title,
  catagoryId,
}: GetCourses): Promise<CourseWithProgressWithCategory[]> => {
  try {
    const courses = await db.course.findMany({
      where: {
        isPublished: true,
        title: {
          contains: title,
        },
        catagoryId,
      },
      include: {
        catagory: true,
        Chapters: {
          where: {
            isPublished: true,
          },
          select: {
            id: true,
          },
        },
        subscription: {
          where: {
            userId,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    const coursesWithProgress: CourseWithProgressWithCategory[] =
    await Promise.all(
      courses.map(async course => {
        if (course.subscription.length === 0) {
          return {
            ...course,
            chapters: course.Chapters,
            category: course.catagory!,
            progress: null,
          };
        }
  
        const progressPercentage = await getProgress(userId, course.id,);
        return {
          ...course,
            chapters: course.Chapters,
            category: course.catagory!,
          progress: progressPercentage,
        };
      })
    );    
    return coursesWithProgress;
  } catch (error) {
    console.log("[GET_COURSES_ERROR]", error);
    return [];
  }
};

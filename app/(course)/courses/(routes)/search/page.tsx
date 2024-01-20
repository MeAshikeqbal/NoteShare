import { db } from "@/lib/db";
import { Categories } from "./_components/categories";
import { SearchInput } from "@/components/search-input";
import { getCourses } from "@/actions/courses/get-course";
import { currentUser } from "@/lib/auth"
import { redirect } from "next/navigation";
import { CoursesList } from "./_components/courses-list";

interface Props {
    searchParams: {
        title: string;
        categoryId: string;
    }
}

const AllCoursesPage = async ({
    searchParams
}: Props) => {
    const session = await currentUser();
    const userId = session?.id;

    if (!userId) {
        return redirect("/login");
    }

    const categorie = await db.catagory.findMany({
        orderBy: {
            name: "asc"
        }
    })

    const courses = await getCourses({
        userId,
        ...searchParams,
        catagoryId: searchParams.categoryId === "all" ? undefined : searchParams.categoryId
    })
    return (
        <>
            <div
                className="px-6 pt-6 md:hidden md:mb-0 block"
            >
                <SearchInput />
            </div>
            <div
                className="p-6"
            >
                <Categories
                    items={categorie}
                />
                <CoursesList
                    items={courses
                        .map((course) => ({
                            ...course,
                            Catagory: course.catagory || null
                        }))
                    }
                />
            </div>
        </>
    );
}

export default AllCoursesPage;

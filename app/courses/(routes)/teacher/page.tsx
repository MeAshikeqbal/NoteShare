import { Button } from "@/components/ui/button";
import { currentUser } from "@/lib/auth"
import Link from "next/link";
import { redirect } from "next/navigation";

const TeacherCourcesPage = async () => {
    const session = await currentUser();
    const userId = session?.id;

    if(!userId) {
        return redirect("/login");
    }


    if(session?.role !== "TEACHER") {
        return redirect("/courses");
    }

    return (
        <div
        className="p-6"
        >
            <Link
            href="/courses/teacher/new"
            about="Add New Course"
            >
            <Button>
                Add New Course
            </Button>
            </Link>
        </div>
    );
}

export default TeacherCourcesPage;
import { Button } from "@/components/ui/button";
import { currentUser } from "@/lib/auth"
import Link from "next/link";
import { redirect } from "next/navigation";
import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";
import { db } from "@/lib/db";

const TeacherCourcesPage = async () => {
    const session = await currentUser();
    const userId = session?.id;

    if (!userId) {
        return redirect("/login");
    }


    if (session?.role !== "TEACHER") {
        return redirect("/courses");
    }

    const courses = await db.course.findMany({
        where: {
            userId
        },
        orderBy: {
            createdAt: "desc"
        }
    })

    return (
        <div
            className="p-6"
        >
            <DataTable
                columns={columns}
                data={courses}
            />
        </div>
    );
}

export default TeacherCourcesPage;
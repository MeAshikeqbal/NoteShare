import { db } from "@/lib/db";
import { Categories } from "./_components/categories";

const AllCoursesPage = async () => {
    const categories = await db.catagory.findMany({
        orderBy:{
            name:"asc"
        }
    })
    return ( 
        <div
        className="p-6"
        >
            <Categories
            items={categories}
            />
        </div>
     );
}
 
export default AllCoursesPage;

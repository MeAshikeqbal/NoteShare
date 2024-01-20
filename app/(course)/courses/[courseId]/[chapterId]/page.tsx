import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

const ChapterIdPaga = async ({
    params
}:{
    params:{
        courseId: string;
        chapterId: string;   
    }

}) => {

    const user = await currentUser()
    const userId = user?.id

    if(!userId){
        return redirect("/login");
    }

    return ( 
        <div>
            <h1>ChapterIdPa
                ga</h1>
        </div>
     );
}
 
export default ChapterIdPaga;
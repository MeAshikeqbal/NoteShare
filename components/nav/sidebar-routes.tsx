"use client"
import { Compass, Layout, List } from "lucide-react"
import { SidebarItem } from "./sidebar-item"
import { usePathname } from "next/navigation"

const userRoutes = [
    {
        icon: Layout,
        lable: "Dashboard",
        href: "/courses"
    },
    {
        icon: Compass,
        lable: "Courses",
        href: "/courses/search"
    }

]

const teacherRoutes = [
    {
        icon: List,
        lable: "Teacher Dashboard",
        href: "/courses/teacher"
    },
]


export const SidebarRoutes = () => {
    const pathname = usePathname()
    const isTeacherPage = pathname?.includes("/courses/teacher")


    const routes= isTeacherPage ? teacherRoutes : userRoutes

    return (
        <div
            className="flex flex-col w-full"
        >
            {routes.map((routes)=>(
                <SidebarItem
                key={routes.href}
                icon={routes.icon}
                lable={routes.lable}
                href={routes.href}
                />
            ))}
        </div>
    )
}
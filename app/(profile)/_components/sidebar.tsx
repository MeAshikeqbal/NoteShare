"use client"

import { usePathname } from "next/navigation";
import { DashboardIcon } from "@radix-ui/react-icons";


export const DashboardSidebar = () => {
    const pathname = usePathname();

    const routes = [
        {
            href: "/dashboard",
            label: "Dashboard",
            active: pathname.startsWith(`/dashboard`),            
            icon: <DashboardIcon className="w-5 h-5" />,
        },
        {
            href: "/dashboard/notes",
            label: "Notes",
            active: pathname === `/dashboard/notes`,
            icon: <DashboardIcon className="w-5 h-5" />,
        },
        {
            href: "/dashboard/courses",
            label: "Courses",
            active: pathname === `/dashboard/courses`,
            icon: <DashboardIcon className="w-5 h-5" />,
        },
        {
            href: "/dashboard/blogs",
            label: "Blogs",
            active: pathname === `/dashboard/blogs`,
            icon: <DashboardIcon className="w-5 h-5" />,
        }
    ]

    return (
        <div>
          <SideBar
              routes={routes}
              className="hidden md:flex flex-col items-center justify-between w-20 h-screen bg-blue-950"
          />

        </div>
    )
}
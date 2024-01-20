"use client"

import { usePathname } from "next/navigation"
import { UserButton } from "./auth/user-button"
import { Button } from "./ui/button"
import { LogOut } from "lucide-react"
import Link from "next/link"
import { useCurrentUser } from "@/hooks/use-current-user"
import { SearchInput } from "./search-input"

export const NavbarRoutes = () => {

    const pathname = usePathname()


    const isSearchPage = pathname?.startsWith("/courses/search")
    const isTeacherPage = pathname?.startsWith("/courses/teacher")
    const isPlayerPage = pathname?.includes("/courses/") && !pathname?.includes("/courses/search");    
    const isTeacher = useCurrentUser()?.role === "TEACHER"

    return (
        <>
            {(isSearchPage && (
                <div className="hidden md:block">
                    <SearchInput />
                </div>
            ))}
            <div
                className="flex gap-x-2 ml-auto items-center"
            >
                {(isTeacherPage || isPlayerPage)  ? (
                    <Link
                        href="/courses"
                        about="Go back to courses"
                    >
                        <Button
                            variant="ghost"
                        >
                            <LogOut
                                className="h-4 w-4 mr-2"
                            />
                            Exit
                        </Button>
                    </Link>
                ) : (
                    isTeacher && (
                        <Link
                            href="/courses/teacher"
                            about="Go to teacher mode"
                        >
                            <Button
                                variant="ghost"
                            >
                                Teacher Mode
                            </Button>
                        </Link>
                    )
                )}
                <UserButton />
            </div>
        </>
    )
}
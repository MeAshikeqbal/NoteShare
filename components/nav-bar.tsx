"use client"

import { cn } from "@/lib/utils"
import Link from "next/link"
import { useParams, usePathname } from "next/navigation";
import React, { useState, } from "react";
import { Button } from "./ui/button";
import { HamburgerMenuIcon, Cross1Icon } from "@radix-ui/react-icons";
import { UserButton } from "./auth/user-button";
import Image from 'next/image'


export function Navbar({
    className,
    ...props
}: React.HTMLAttributes<HTMLElement>) {
    const pathname = usePathname();
    const params = useParams();

    const [isOpen, setIsOpen] = useState(false);

    const routes = [
        {
            href: `/notes`,
            label: 'Notes',
            active: pathname === `/notes`,
        },
        {
            href: `/courses`,
            label: 'Courses',
            active: pathname === `/courses`,
        },
        {
            href: `/blogs`,
            label: 'Blogs',
            active: pathname === `/blogs`,
        },
        {
            href: `/dashboard`,
            label: 'Dashboard',
            active: pathname.startsWith(`/dashboard`),            
        }
    ];

    return (
        <div className="top-0 z-50 w-screen sticky">
            {/*             <div className="!visible flex items-center md:hidden bg-slate-600 h-14">

                <Button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className=" float-left flex items-center text-sm font-medium text-white bg-blue-950 "
                >
                    <HamburgerMenuIcon
                        className="w-8 h-8 ml-4 text-blue-100"
                    />
                    <span className="ml-2">Menu</span>
                    {isOpen && (
                        <div className=" absolute right-0 z-10 flex flex-col items-start py-2 bg-blue-950 rounded-md shadow-lg w-full h- top-0 mt-0">
                            <Cross1Icon className="w-8 h-8 ml-4 text-blue-100" />
                            <div className="flex flex-col items-start p-4">
                                {routes.map((route) => (
                                    <Link key={route.href} href={route.href}
                                        className={cn(
                                            "pb-2 text-sm text-blue-100 hover:text-white",
                                            route.active ? 'text-white ' : 'text-muted-foreground text-blue-200'
                                        )}
                                    >
                                        {route.label}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </Button>
            </div>
 */}
            {/* For Meddiam to learge devices  */}
            <div className="bg-slate-600 z-10 !visible hidden md:block ">
                <nav
                    className='flex flex-col h-20 items-center justify-between w-full px-4 py-4 mx-auto space-y-4 text-sm font-medium text-center sm:px-6 sm:flex-row sm:space-y-0 sm:space-x-4 z-10'
                >
                    <div
                        className="flex items-center w-full space-x-4"
                    >
                        <Link
                            href="/"
                            className="flex items-center w-full"
                        >
                            <Image
                                src="/logo.svg"
                                alt="Logo"
                                width="100"
                                height="80"
                                loading="lazy"
                                className=" w-48 h-16 pl-4"
                            />
                        </Link>
                    </div>
                    <div
                        className='flex items-center justify-between w-full space-x-4'
                    >
                        {routes.map((route) => (
                            <Link
                                key={route.href}
                                href={route.href}
                                className={cn(
                                    'text-sm font-medium transition-colors text-blue-100 hover:text-white',
                                    route.active ? 'text-white ' : 'text-muted-foreground text-blue-200'
                                )}
                            >
                                {route.label}
                            </Link>
                        ))}

                    </div>
                    <div
                        className="flex items-center justify-end w-full space-x-4"
                    >
                        <UserButton />
                    </div>

                </nav>

            </div>

        </div>

    )
};
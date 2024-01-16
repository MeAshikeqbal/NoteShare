"use client"

import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Button } from "./ui/button"
import { DoubleArrowRightIcon, DoubleArrowLeftIcon, CaretRightIcon } from "@radix-ui/react-icons"
import { Separator } from "./ui/separator"

interface SideBarProps {
    className?: string
    children?: React.ReactNode
    routes?: {
        href: string
        label: string
        active: boolean
        icon?: React.ReactNode
    }[]
}

export const SideBar = ({
    className,
    children,
    routes
}: SideBarProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const onOpen = () => setIsOpen(true);
    const onClose = () => setIsOpen(false);



    return (
        <div>
            {isOpen && (
                <div
                    className="bg-slate-400 h-screen max-w-56 fixed"
                >
                    <div
                        className= {cn(
                            "flex flex-col items-center justify-center w-full bg-slate-500",
                            isOpen ? "w-56" : "w-20"
                        )}
                    >
                        {routes?.map((route) => (
                            <Link
                                key={route.href}
                                href={route.href}
                                className={cn(
                                    'text-sm font-medium transition-colors text-blue-100 hover:text-white',
                                    route.active ? 'text-white ' : 'text-muted-foreground text-blue-200'
                                )}
                            >
                                <div
                                    className="flex items-center justify-start px-5 ml-4 space-x-2 h-20"
                                >
                                    <p>
                                        {route?.icon}
                                    </p>
                                    <p>
                                        {route?.label}
                                    </p>
                                </div>
                                <Separator
                                    className="w-56"
                                />
                            </Link>
                        ))}
                    </div>
                </div>
            )}
            {!isOpen && (
                <div
                    className=" bg-slate-400 h-screen max-w-20 fixed"
                >
                    <div
                        className=" flex flex-col items-center justify-center w-full bg-slate-500"
                    >
                        {routes?.map((route) => (
                            <Link
                                key={route.href}
                                href={route.href}
                                className={cn(
                                    'text-sm font-medium transition-colors text-blue-100 hover:text-white',
                                    route.active ? 'text-white ' : 'text-muted-foreground text-blue-200'
                                )}
                            >
                                <div
                                    className="flex items-center justify-center space-x-2 h-20"
                                >
                                    <p>
                                        {route.icon}
                                    </p>
                                    <CaretRightIcon />
                                </div>
                                <Separator
                                    className="w-20"
                                />
                            </Link>
                        ))}
                    </div>
                </div>
            )}
            <Button
                variant="link"
                className="absolute bottom-0 items-center justify-center h-20"
                onClick={() => setIsOpen(!isOpen)}
            >
                {
                    isOpen ? (
                        <>
                            <DoubleArrowLeftIcon
                                className="w-5 h-5 ml-4 text-blue-100"
                            />
                            <p
                                className="text-blue-100 text-sm font-medium"
                            >
                                Close Sidebar
                            </p>
                        </>

                    ) : (
                        <DoubleArrowRightIcon
                            className="w-5 h-5 ml-4 text-blue-100"
                        />
                    )
                }
            </Button>
        </div>
    )
}
"use client"

import {
    Card,
    CardContent,
    CardHeader,
    CardFooter
} from "@/components/ui/card"
import { Header } from "./header"
import { Social } from "./social"
import { BackButton } from "./back-button"


interface CardWrapperProps {
    children: React.ReactNode
    headerLabel: string
    backButtonLabel: string
    backButtonHref: string
    showSocialButtons?: boolean
}

export const CardWrapper = ({
    children,
    headerLabel,
    backButtonLabel,
    backButtonHref,
    showSocialButtons
}: CardWrapperProps) => {
    return (
        <Card
            className="w-[400px] shadow-md"
        >
            <CardHeader>
                <Header
                    lable={headerLabel}
                />
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
            {showSocialButtons &&(
                <CardFooter>
                    <Social/>
                </CardFooter>
            )}
            <CardFooter>
                <BackButton
                label={backButtonLabel}
                href={backButtonHref}
                />
            </CardFooter>
        </Card>
    )
}
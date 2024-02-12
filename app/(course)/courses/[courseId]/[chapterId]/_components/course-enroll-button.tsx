"use client"

import { Button } from "@/components/ui/button"
import axios from "axios"
import { useState } from "react"
import { toast } from "sonner"

interface CourseEnrollButtonProps {
    courseId: string
}

export const CourseEnrollButton = ({
    courseId
}: CourseEnrollButtonProps) => {
    const [loading, setLoading] = useState(false)

    const handleEnroll = async () => {
        try {
            setLoading(true)
            toast.loading("Enrolling...", {
                duration: 5000,
                position: "bottom-right",
                action: {
                    label: "Close",
                    onClick: () => toast.dismiss(),
                }
            });
            const responce = await axios.post(`/api/courses/${courseId}/chackout`);
            toast.success("Enrolled Successfully", {
                duration: 5000,
                position: "bottom-right",
                action: {
                    label: "Close",
                    onClick: () => toast.dismiss(),
                }
            });
            window.location.reload()
        } catch {
            toast.error("Error Enrolling", {
                duration: 5000,
                position: "bottom-right",
                action: {
                    label: "Close",
                    onClick: () => toast.dismiss(),
                }
            });
        }finally{
            setLoading(false)
        }
    }
    return (
        <Button
            size="sm"
            className="w-full md:w-auto"
            onClick={handleEnroll}
            disabled={loading}
        >
            Enroll Now
        </Button>
    )
}
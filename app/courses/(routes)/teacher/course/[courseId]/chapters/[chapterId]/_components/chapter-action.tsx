"use client"

import { ConfirmModal } from "@/components/modals/confirm-modal"
import { Button } from "@/components/ui/button"
import axios from "axios"
import { Trash2Icon } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"

interface ChapterActionProps {
    disabled: boolean
    courseId: string
    chapterId: string
    isPublished: boolean
}

export const ChapterAction = ({
    disabled,
    courseId,
    chapterId,
    isPublished
}: ChapterActionProps) => {
    const router = useRouter()
    const [isLoaded, setIsLoaded] = useState(false)
    const onDelete = async () => {
        try {
            setIsLoaded(true)
            toast.loading("Deleting chapter", {
                duration: 5000,
                position: "bottom-right",
                action: {
                    label: "Close",
                    onClick: () => toast.dismiss(),
                }
            })
            await axios.delete(`/api/courses/${courseId}/chapters/${chapterId}`)
            toast.success("Chapter deleted", {
                duration: 5000,
                position: "bottom-right",
                action: {
                    label: "Close",
                    onClick: () => toast.dismiss(),
                }
            })
            router.refresh()
            router.push(`/courses/teacher/course/${courseId}`)
        } catch {
            toast.error("Failed to delete chapter", {
                duration: 5000,
                position: "bottom-right",
                action: {
                    label: "Close",
                    onClick: () => toast.dismiss(),
                }
            })
        } finally {
            setIsLoaded(false)
            router.refresh()
        }
    }

    const onClick = async () => {
        try {
            setIsLoaded(true)
            toast.loading("Publishing chapter", {
                duration: 5000,
                position: "bottom-right",
                action: {
                    label: "Close",
                    onClick: () => toast.dismiss(),
                }
            })
            if (isPublished) {
                await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}/unpublish`)
                toast.success("Chapter unpublished", {
                    duration: 5000,
                    position: "bottom-right",
                    action: {
                        label: "Close",
                        onClick: () => toast.dismiss(),
                    }
                })
                router.refresh()
            } else {
                await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}/publish`)
            }

            toast.success("Chapter published", {
                duration: 5000,
                position: "bottom-right",
                action: {
                    label: "Close",
                    onClick: () => toast.dismiss(),
                }
            })
            router.refresh()
        } catch {
            toast.error("Failed to publish chapter", {
                duration: 5000,
                position: "bottom-right",
                action: {
                    label: "Close",
                    onClick: () => toast.dismiss(),
                }
            })
        } finally {
            setIsLoaded(false)
            router.refresh()
        }
    }
    return (
        <div
            className="flex items-center gap-x-2"
        >
            <Button
                onClick={onClick}
                disabled={disabled || isLoaded}
                variant={disabled ? "secondary" : "default"}
                size="sm"
            >
                {isPublished ? "Unpublish" : "Publish"}
            </Button>
            <ConfirmModal
                onConfirm={onDelete}
            >
                <Button
                    size="sm"
                    variant="destructive"
                >
                    <Trash2Icon
                        className="h-4 w-4"
                    />
                </Button>
            </ConfirmModal>
        </div>
    )
}
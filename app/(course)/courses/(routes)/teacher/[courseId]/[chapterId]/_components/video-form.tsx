"use client"

import * as z from "zod"
import axios from "axios"
import MuxPlayer from "@mux/mux-player-react"
import { Button } from "@/components/ui/button"
import { Pencil, PlusCircle, VideoIcon } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { Chapter, MuxData } from "@prisma/client"
import { FileUpload } from "@/components/file-upload"

interface VideoFormProps {
    initialData: Chapter & {muxData?: MuxData | null},
    courseId: string,
    chapterId: string
}


const formSchema = z.object({
    videoUrl: z.string().min(1, {
      message: "Video is required",
    }),
  });

export const VideoForm = ({
    initialData,
    courseId,
    chapterId
}: VideoFormProps) => {
    const router = useRouter()

    const [isEditing, setIsEditing] = useState(false)
    const toggleEditing = () => setIsEditing((current) => !current)

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        try {
            toast.loading("Updating course video", {
                duration: 5000,
                position: "bottom-right",
                action: {
                    label: "Close",
                    onClick: () => toast.dismiss(),
                }
            })

            await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}`, data)

            toast.success("Course video updated", {
                duration: 3000,
                action: {
                    label: "Close",
                    onClick: () => toast.dismiss(),
                }

            })
            toggleEditing()
            router.refresh()
        } catch (error) {
            toast.error("Something went wrong", {
                duration: 5000,
                action: {
                    label: "Close",
                    onClick: () => toast.dismiss(),
                }

            })
        }
    }

    return (
        <div
            className="mt-6 border bg-slate-100 rounded-md p-4"
        >
            <div
                className="font-medium flex items-center justify-between"
            >
                Chapter Video
                <Button
                    variant="ghost"
                    onClick={toggleEditing}
                >
                    {!isEditing && !initialData.videoUrl && (
                        <>
                            <PlusCircle
                                className="w-4 h-4 mr-2"
                            />
                            Add a Video
                        </>
                    )}
                    {isEditing && (
                        <>
                            Cancel
                        </>
                    )}
                    {!isEditing && initialData.videoUrl && (
                        <>
                            <Pencil
                                className="w-4 h-4 mr-2"
                            />
                            Update Video
                        </>
                    )}
                </Button>
            </div>
            {!isEditing && (
                !initialData.videoUrl ? (
                    <div
                        className="flex items-center justify-center h-60 bg-slate-200 rounded-md"
                    >
                        <VideoIcon
                            className="h-10 w-10 text-slate-400"
                        />

                    </div>
                ) : (
                    <div
                        className="relative aspect-video mt-2"
                    >
                        <MuxPlayer
                        playbackId={initialData.muxData?.playbackId || ""}
                        />
                    </div>
                )

            )}

            {isEditing && (
                <div>
                    <FileUpload
                        endpoint="chapterVideo"
                        onChange={(url) => {
                            if (url) {
                                onSubmit({
                                    videoUrl: url
                                })
                            }
                        }}
                    />
                    <div
                        className="text-xs text-muted-forground mt-4"
                    >
                        <p>
                            You can upload a video up to 1GB in size.
                        </p>
                        <p>
                            We support most video formats, but recommend using a MP4 file to ensure that your video can be played on all devices.
                        </p>
                    </div>
                </div>
            )}
            {initialData.videoUrl && !isEditing && (
                <div
                className="text-xs text-muted-forground mt-2"
                >
                    Video can take a few minutes to process. Refresh the page if the dose not appear hare.
                </div>
            )}
        </div>
    );
}
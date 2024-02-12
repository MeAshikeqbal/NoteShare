"use client"

import * as z from "zod"
import axios from "axios"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { ImageIcon, Pencil, PlusCircle } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { Course } from "@prisma/client"
import { FileUpload } from "@/components/file-upload"

interface ImageFormProps {
    initialData: Course,
    courseId: string
}


const formSchema = z.object({
    image: z.string().min(1, {
      message: "Image is required",
    }),
  });

export const ImageForm = ({
    initialData,
    courseId
}: ImageFormProps) => {
    const router = useRouter()

    const [isEditing, setIsEditing] = useState(false)
    const toggleEditing = () => setIsEditing((current) => !current)

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        try {
            toast.loading("Updating course Image", {
                duration: 5000,
                position: "bottom-right",
                action: {
                    label: "Close",
                    onClick: () => toast.dismiss(),
                }
            })

            await axios.patch(`/api/courses/${courseId}`, data)

            toast.success("Course Image updated", {
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
                Course Image
                <Button
                    variant="ghost"
                    onClick={toggleEditing}
                >
                    {!isEditing && !initialData.image && (
                        <>
                            <PlusCircle
                                className="w-4 h-4 mr-2"
                            />
                            Add Image
                        </>
                    )}
                    {isEditing && (
                        <>
                            Cancel
                        </>
                    )}
                    {!isEditing && initialData.image && (
                        <>
                            <Pencil
                                className="w-4 h-4 mr-2"
                            />
                            Edit Image
                        </>
                    )}
                </Button>
            </div>
            {!isEditing && (
                !initialData.image ? (
                    <div
                        className="flex items-center justify-center h-60 bg-slate-200 rounded-md"
                    >
                        <ImageIcon
                            className="h-10 w-10 text-slate-400"
                        />

                    </div>
                ) : (
                    <div
                        className="relative aspect-video mt-2"
                    >
                        <Image
                            alt="Course Image"
                            src={initialData.image}
                            fill
                            className="object-cover rounded-md"
                        />
                    </div>
                )

            )}

            {isEditing && (
                <div>
                    <FileUpload
                        endpoint="courseImage"
                        onChange={(url) => {
                            if (url) {
                                onSubmit({
                                    image: url
                                })
                            }
                        }}
                    />
                    <div
                        className="text-xs text-muted-forground mt-4"
                    >
                        16:9 aspect ratio recommended
                    </div>
                </div>
            )}
        </div>
    );
}
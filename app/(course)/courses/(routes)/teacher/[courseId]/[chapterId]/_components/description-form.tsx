"use client"

import * as z from "zod"
import axios from "axios"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormMessage,
    FormItem
} from "@/components/ui/form"
import { Pencil } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Chapter } from "@prisma/client"
import { Editor } from "@/components/editor"
import { Preview } from "@/components/preview"

interface DescriptionFormProps {
    initialData: Chapter,
    courseId: string,
    chapterId: string
}

const formSchema = z.object({
    description: z.string().min(1, {
        message: "Description is required",
    }),
});

export const DiscriptionForm = ({
    initialData,
    courseId,
    chapterId
}: DescriptionFormProps) => {
    const router = useRouter()

    const [isEditing, setIsEditing] = useState(false)
    const toggleEditing = () => setIsEditing((current) => !current)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            description: initialData?.description || ""
        },
    });
    const { isSubmitting, isValid } = form.formState



    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        try {
            toast.loading("Updating chapter description", {
                duration: 5000,
                position: "bottom-right",
                action: {
                    label: "Close",
                    onClick: () => toast.dismiss(),
                }
            })

            await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}`, data)

            toast.success("Chapter description updated", {
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
                Chapter description
                <Button
                    variant="ghost"
                    onClick={toggleEditing}
                >
                    {isEditing ? (
                        <>
                            Cancel
                        </>
                    ) : (
                        <>
                            <Pencil
                                className="w-4 h-4 mr-2"
                            />
                            Edit Description
                        </>
                    )}
                </Button>
            </div>
            {!isEditing && (
                <div
                    className={cn(
                        "text-sm mt-2",
                        !initialData.description && "text-slate-500 italic"
                    )}
                >

                    {!initialData.description && "No description provided"}
                    {initialData.description &&(
                        <Preview
                        value={initialData.description}
                        />
                    )}
                </div>
            )}
            {isEditing && (
                <Form
                    {...form}
                >
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4 mt-4"
                    >
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Editor
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div
                            className="flex items-center gap-x-2"
                        >
                            <Button
                                disabled={!isValid || isSubmitting}
                                type="submit"
                            >
                                Save
                            </Button>

                        </div>
                    </form>
                </Form>
            )}
        </div>
    );
}
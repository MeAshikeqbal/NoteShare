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
import { Pencil, PlusCircle } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Chapter, Course } from "@prisma/client"
import { Input } from "@/components/ui/input"

interface ChaptersFormProps {
    initialData: Course & {chapters: Chapter[]},
    courseId: string
}

const formSchema = z.object({
    title: z.string().min(1, {
        message: "Please enter a title"
    }),
});

export const ChaptersForm = ({
    initialData,
    courseId
}: ChaptersFormProps) => {
    const router = useRouter()
    const [isCreating, setIsCreating] = useState(false)
    const [isUpdating, setIsUpdating] = useState(false)

    const toggleCreating = () => setIsCreating((current) => !current)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: ""
        },
    });
    const { isSubmitting, isValid } = form.formState



    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        try {
            toast.loading("Creating Chapter", {
                duration: 5000,
                position: "bottom-right",
                action: {
                    label: "Close",
                    onClick: () => toast.dismiss(),
                }
            })

            await axios.post(`/api/courses/${courseId}/chapters`, data)

            toast.success("Chapter created", {
                duration: 3000,
                action: {
                    label: "Close",
                    onClick: () => toast.dismiss(),
                }
            })

            toggleCreating()
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
                Course chapters
                <Button
                    variant="ghost"
                    onClick={toggleCreating}
                >
                    {isCreating ? (
                        <>
                            Cancel
                        </>
                    ) : (
                        <>
                            <PlusCircle
                                className="w-4 h-4 mr-2"
                            />
                            Add chapter
                        </>
                    )}
                </Button>
            </div>
            {isCreating && (
                <Form
                    {...form}
                >
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4 mt-4"
                    >
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled={isSubmitting}
                                            placeholder="Chapter title"
                                            className="w-full bg-slate-50"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button
                            disabled={!isValid || isSubmitting}
                            type="submit"
                        >
                            Create chapter
                        </Button>
                    </form>
                </Form>
            )}
            {!isCreating && (
                <div
                className={cn(
                    "text-sm mt-2",
                    !initialData.chapters.length && "text-slate-500 italic"
                )}
                >
                    No chapters
                </div>
            )}
            {!isCreating && (
                <p
                className="text-xs text-muted-foreground mt-4"
                >
                    Drag and drop to reorder chapters
                </p>
            )}
        </div>
    );
}
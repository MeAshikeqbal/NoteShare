"use client"

import * as z from "zod"
import axios from "axios"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Form,
    FormControl,
    FormLabel,
    FormField,
    FormMessage,
    FormItem
} from "@/components/ui/form"
import { CreateCourseSchema } from "@/schemas"
import { Pencil } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

interface TitleFormProps {
    initialData: {
        title: string
    }
    courseId: string
}

const formSchema = z.object({
    title: z.string().min(1, {
      message: "Title is required",
    }),
  });

export const TitleForm = ({
    initialData,
    courseId
}: TitleFormProps) => {
    const router = useRouter()

    const [isEditing, setIsEditing] = useState(false)
    const toggleEditing = () => setIsEditing((current) => !current)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData,
      });    
      const { isSubmitting, isValid } = form.formState



    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        try {
            toast.loading("Updating course title", {
                duration: 5000,
                position: "bottom-right",
                action: {
                    label: "Close",
                    onClick: () => toast.dismiss(),
                }
            })
            await axios.patch(`/api/courses/${courseId}`, data)
            toast.success("Course title updated",{
                duration: 3000,
                action: {
                    label: "Close",
                    onClick: () => toast.dismiss(),
                }

            })
            toggleEditing()
            router.refresh()
        } catch (error) {
            toast.error("Something went wrong",{
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
                Course Title
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
                            Edit Title
                        </>
                    )}
                </Button>
            </div>
            {!isEditing && (
                <p
                    className="text-sm mt-2"
                >
                    {initialData.title}
                </p>
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
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            disabled={isSubmitting}
                                            placeholder="Course Title"
                                            {...field}
                                            className="bg-slate-50"
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
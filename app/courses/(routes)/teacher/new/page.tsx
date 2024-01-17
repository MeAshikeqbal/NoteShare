"use client"
import * as z from "zod"
import { useRouter } from "next/navigation"
import { useCurrentUser } from "@/hooks/use-current-user"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import Link from "next/link"
import { toast } from "sonner"

const formSchema = z.object({
    title: z.string().min(1, {
        message: "Title is required",
    }),
});

const CreatePage = () => {
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: ""
        },
    });
    const { isSubmitting, isValid } = form.formState

    const onSubmit = async (
        data: z.infer<typeof formSchema>
    ) => {
        try {
            const response = await axios.post("/api/courses", data)
            router.push(`/courses/teacher/course/${response.data.id}/`)
            toast.success("Course created successfully", {
                duration: 3000,
                position: "bottom-right",
                action: {
                    label: "Close",
                    onClick: () => toast.dismiss(),
                }
            })
        }
        catch {
            toast.error("Something went wrong", {
                duration: 5000,
                position: "bottom-right",
                action: {
                    label: "Close",
                    onClick: () => toast.dismiss(),
                }
            })
        }
    }

    return (
        <div className="max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6">
            <div>
                <h1
                    className="text-2xl"
                >
                    Name your course
                </h1>
                <p
                    className="text-sm text-slate-600"
                >
                    Start by giving your course a name... Don&apos;t worry, you can change it later.
                </p>
                <Form
                    {...form}
                >
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8 mt-8"
                    >
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Course Title
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Course Title"
                                            disabled={isSubmitting}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        What is the name of your course?
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div
                            className="flex items-center gap-x-2"
                        >
                            <Link
                                href="/courses/teacher"
                            >
                                <Button
                                    type="button"
                                    variant="ghost"
                                >
                                    Back
                                </Button>
                            </Link>
                            <Button
                                type="submit"
                                disabled={!isValid || isSubmitting}

                            >
                                Next
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
}

export default CreatePage;
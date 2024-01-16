"use client"

import { UploadDropzone } from "@/lib/uploadthing"
import { ourFileRouter } from "@/app/api/uploadthing/core"
import { toast } from "sonner"

interface FileUploadProps {
    onChange: (url?: string) => void
    endpoint: keyof typeof ourFileRouter
}

export const FileUpload = ({ onChange, endpoint }: FileUploadProps) => {
    return (
        <UploadDropzone
            endpoint={endpoint}
            onClientUploadComplete={(res) => {
                onChange(res?.[0].url)
            }}
            onUploadError={(err: Error) => {
                toast.error(`${err?.message}`, {
                    duration: 5000,
                    position: "bottom-right",
                    action: {
                        label: "Close",
                        onClick: () => toast.dismiss(),
                    }
                })
            }}
        />
    )
}
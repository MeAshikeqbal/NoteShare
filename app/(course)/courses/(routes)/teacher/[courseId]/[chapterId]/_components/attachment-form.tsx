"use client";

import * as z from "zod";
import axios from "axios";
import { PlusCircle, File, Loader2, X } from "lucide-react";
import { useState } from "react";

import { useRouter } from "next/navigation";
import { Attachment, Chapter, ChapterAttachment, Course } from "@prisma/client";

import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/file-upload";
import { toast } from "sonner";

interface AttachmentFormProps {
  initialData: Chapter & { attachments: ChapterAttachment[]};
  courseId: string;
  chapterId: string;
};

const formSchema = z.object({
  url: z.string().min(1),
});

export const AttachmentForm = ({
  initialData,
  courseId,
  chapterId,
}: AttachmentFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const toggleEdit = () => setIsEditing((current) => !current);

  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      toast.loading("Uploading attachment", {
        duration: 5000,
        position: "bottom-right",
        action: {
          label: "Close",
          onClick: () => toast.dismiss(),
        }
      });
      await axios.post(`/api/courses/${courseId}/chapters/${chapterId}/attachments`, values);
      toast.success("Course updated", {
        duration: 5000,
        position: "bottom-right",
        action: {
          label: "Close",
          onClick: () => toast.dismiss(),
        }
      });
      toggleEdit();
      router.refresh();
    } catch {
      toast.error("Something went wrong", {
        duration: 5000,
        position: "bottom-right",
        action: {
          label: "Close",
          onClick: () => toast.dismiss(),
        }
      });
    }
  };

  const onDelete = async (id: string) => {
    try {
      toast.loading("Deleting attachment", {
        duration: 5000,
        position: "bottom-right",
        action: {
          label: "Close",
          onClick: () => toast.dismiss(),
        }
      })
      setDeletingId(id);
      await axios.delete(`/api/courses/${courseId}/chapters/${chapterId}/attachments/${id}`);
      toast.success("Attachment deleted", {
        duration: 5000,
        position: "bottom-right",
        action: {
          label: "Close",
          onClick: () => toast.dismiss(),
        }
      });
      router.refresh();
    } catch {
      toast.error("Something went wrong", {
        duration: 5000,
        position: "bottom-right",
        action: {
          label: "Close",
          onClick: () => toast.dismiss(),
        }
      });
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Chapter attachments
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing && (
            <>Cancel</>
          )}
          {!isEditing && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add a file
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <>
          {initialData.attachments.length === 0 && (
            <p className="text-sm mt-2 text-slate-500 italic">
              No attachments yet
            </p>
          )}
          {initialData.attachments.length > 0 && (
            <div className="space-y-2">
              {initialData.attachments.map((attachment) => (
                <div
                  key={attachment.id}
                  className="flex items-center p-3 w-full bg-sky-100 border-sky-200 border text-sky-700 rounded-md"
                >
                  <File className="h-4 w-4 mr-2 flex-shrink-0" />
                  <p className="text-xs line-clamp-1">
                    {attachment.name}
                  </p>
                  {deletingId === attachment.id && (
                    <div>
                      <Loader2 className="h-4 w-4 animate-spin" />
                    </div>
                  )}
                  {deletingId !== attachment.id && (
                    <button
                      onClick={() => onDelete(attachment.id)}
                      className="ml-auto hover:opacity-75 transition"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      )}
      {isEditing && (
        <div>
          <FileUpload
            endpoint="chapterAttachment"
            onChange={(url) => {
              if (url) {
                onSubmit({ url: url });
              }
            }}
          />
        </div>
      )}
          <div className="text-xs text-muted-foreground mt-4">
            Add anything your students might need to complete the chapter.
          </div>
    </div>
  )
}
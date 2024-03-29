"use client";

import { ConfirmModal } from "@/components/modals/confirm-modal";
import { Button } from "@/components/ui/button";
import { useConfettiStore } from "@/hooks/use-confetti-store";
import axios from "axios";
import { Trash2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface ActionProps {
  disabled: boolean;
  courseId: string;
  isPublished: boolean;
}

export const Action = ({ disabled, courseId, isPublished }: ActionProps) => {
  const router = useRouter();
  const confetti = useConfettiStore();
  const [isLoaded, setIsLoaded] = useState(false);
  const onDelete = async () => {
    try {
      setIsLoaded(true);
      toast.loading("Deleting Course", {
        duration: 5000,
        position: "bottom-right",
        action: {
          label: "Close",
          onClick: () => toast.dismiss(),
        },
      });
      await axios.delete(`/api/courses/${courseId}`);
      toast.success("Chapter deleted", {
        duration: 5000,
        position: "bottom-right",
        action: {
          label: "Close",
          onClick: () => toast.dismiss(),
        },
      });
      router.refresh();
      router.push("/courses/teacher/");
    } catch {
      toast.error("Failed to delete Course", {
        duration: 5000,
        position: "bottom-right",
        action: {
          label: "Close",
          onClick: () => toast.dismiss(),
        },
      });
    } finally {
      setIsLoaded(false);
      router.refresh();
    }
  };

  const onClick = async () => {
    try {
      setIsLoaded(true);
      toast.loading("Publishing Course", {
        duration: 5000,
        position: "bottom-right",
        action: {
          label: "Close",
          onClick: () => toast.dismiss(),
        },
      });
      if (isPublished) {
        await axios.patch(`/api/courses/${courseId}/unpublish`);
        toast.success("Course unpublished", {
          duration: 5000,
          position: "bottom-right",
          action: {
            label: "Close",
            onClick: () => toast.dismiss(),
          },
        });
        router.refresh();
      } else {
        await axios.patch(`/api/courses/${courseId}/publish`);
        toast.success("Course published", {
          duration: 5000,
          position: "bottom-right",
          action: {
            label: "Close",
            onClick: () => toast.dismiss(),
          },
        });
        confetti.onOpen();
      }

      router.refresh();
    } catch {
      toast.error("Failed to publish Course", {
        duration: 5000,
        position: "bottom-right",
        action: {
          label: "Close",
          onClick: () => toast.dismiss(),
        },
      });
    } finally {
      setIsLoaded(false);
      router.refresh();
    }
  };
  return (
    <div className="flex items-center gap-x-2">
      <Button
        onClick={onClick}
        disabled={disabled || isLoaded}
        variant={disabled ? "secondary" : "default"}
        size="sm"
      >
        {isPublished ? "Unpublish" : "Publish"}
      </Button>
      <ConfirmModal onConfirm={onDelete}>
        <Button size="sm" variant="destructive">
          <Trash2Icon className="h-4 w-4" />
        </Button>
      </ConfirmModal>
    </div>
  );
};

"use client";

import { Button } from "@/components/ui/button";

interface CourseEnrollButtonProps {
  courseId: string;
}

export const CourseEnrollButton = ({ courseId }: CourseEnrollButtonProps) => {
  return (
    <Button size="sm" className="w-full md:w-auto">
      Enroll Now
    </Button>
  );
};

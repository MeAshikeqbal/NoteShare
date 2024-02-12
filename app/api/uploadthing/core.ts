import { currentRole, currentUser } from "@/lib/auth";
import { UserRoles } from "@prisma/client";
import { NextResponse } from "next/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";



const f = createUploadthing();

const handleAuth = async () => {
  const session = await currentUser();
  const user = session?.id;
  const userId = user;
  if (!user) throw new Error("Unauthorized");

  return { userId };
};

export const ourFileRouter = {
  courseImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(() => handleAuth())
    .onUploadComplete(() => console.log("upload complete")),
  courseAttachment: f(["text", "image", "video", "audio", "pdf"])
    .middleware(() => handleAuth())
    .onUploadComplete(() => console.log("upload complete")),
  chapterVideo: f({ video: { maxFileSize: "1GB", maxFileCount: 1 } })
    .middleware(() => handleAuth())
    .onUploadComplete(() => console.log("upload complete")),
  chapterAttachment: f(["text", "image", "video", "audio", "pdf"])
    .middleware(() => handleAuth())
    .onUploadComplete(() => console.log("upload complete")),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;

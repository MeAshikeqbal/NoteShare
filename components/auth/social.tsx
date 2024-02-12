"use client";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { signIn } from "next-auth/react";
import { Button } from "../ui/button";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { Separator } from "../ui/separator";

export const Social = () => {
  const onClick = (provider: "google" | "github") => {
    signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    });
  };

  return (
    <div className="flex flex-col items-center justify-center w-full gap-y-3">
      <div className="flex items-center justify-center gap-x-2">
        <Separator />
        <span className="mx-2 text-gray-400">or</span>
        <Separator />
      </div>
      <div className="flex items-center w-full gap-x-2">
        <Button
          size="lg"
          className="w-full"
          variant="outline"
          onClick={() => onClick("google")}
        >
          <FcGoogle className="h-6 w-6" />
        </Button>
        <Button
          size="lg"
          className="w-full"
          variant="outline"
          onClick={() => onClick("github")}
        >
          <FaGithub className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
};

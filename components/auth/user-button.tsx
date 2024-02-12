"use client";

import { FaUser } from "react-icons/fa";
import { ExitIcon, EnterIcon } from "@radix-ui/react-icons"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/avatar";
import { useCurrentUser } from "@/hooks/use-current-user";
import { LogoutButton } from "@/components/auth/logout-button";
import { LoginButton } from "./login-button";

export const UserButton = () => {
  const user = useCurrentUser();

  if (!user) {
    return (
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarFallback className="bg-slate-500">
                <FaUser className="text-white" />
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-40" align="end">
            <LoginButton>
              <DropdownMenuItem>
                <EnterIcon className="h-4 w-4 mr-2" />
                Log In
              </DropdownMenuItem>
            </LoginButton>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    )
  }

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarImage src={user?.image || ""} />
            <AvatarFallback className=" bg-slate-500">
              <FaUser className="text-white" />
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-40" align="end">
          <DropdownMenuItem
            className="flex flex-col items-start justify-center space-y-1"
          >
            <p className="text-sm font-medium">
              {user?.name}
            </p>
            <p className="text-xs text-gray-500">
              @{user?.username}
            </p>
          </DropdownMenuItem>
          <LogoutButton>
            <DropdownMenuItem>
              <ExitIcon className="h-4 w-4 mr-2" />
              Logout
            </DropdownMenuItem>
          </LogoutButton>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

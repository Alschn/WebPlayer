"use client";

import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { ExternalLink, LogOut, Settings, User } from "lucide-react";
import NextLink from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { DropdownMenu } from "~/components/ui/dropdown-menu";
import { useAuth } from "~/context/auth";
import "~/styles/globals.css";
import type { DropdownMenuProps } from "@radix-ui/react-dropdown-menu";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "~/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useSpotifyPlayer } from "react-spotify-web-playback-sdk";

const SPOTIFY_ACCOUNT_OVERVIEW_URL =
  "https://www.spotify.com/pl/account/overview/";

type CurrentUserDropdownProps = DropdownMenuProps;

const useLogoutMutation = () => {
  const { toast } = useToast();
  const router = useRouter();
  const player = useSpotifyPlayer();

  return useMutation({
    mutationFn: async () => {
      const res = await fetch(
        new URL("/api/auth/logout/", window.location.href).href,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        },
      );
      return (await res.json()) as unknown;
    },
    onSuccess: () => {
      toast({
        title: "Logged out",
        description: "Redirecting to login page...",
        variant: "default",
        duration: 2000,
      });
      router.replace("/login");
      player?.disconnect();
    },
    onError: () => {
      toast({
        title: "Something went wrong",
        description: "Could not log out...",
        variant: "destructive",
        duration: 2000,
      });
    },
  });
};

const CurrentUserDropdown = (props: CurrentUserDropdownProps) => {
  const { user, isLoading } = useAuth();
  const logoutMutation = useLogoutMutation();

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  // todo: loading state
  if (isLoading) return null;

  if (!user) return null;

  const userDisplayName = user.display_name;
  const userImages = user.images;
  const userImage = userImages?.[0]?.url;

  return (
    <DropdownMenu {...props}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="w-fit justify-normal gap-2 rounded-full pr-2 dark:border-stone-900"
        >
          <Avatar>
            <AvatarImage src={userImage} />
            <AvatarFallback>
              {userDisplayName.at(0)?.toUpperCase() ?? ""}
            </AvatarFallback>
          </Avatar>
          <span>{userDisplayName}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40">
        <NextLink href={SPOTIFY_ACCOUNT_OVERVIEW_URL} passHref>
          <DropdownMenuItem>
            <ExternalLink className="mr-2 h-4 w-4" />
            <span>Account</span>
          </DropdownMenuItem>
        </NextLink>
        <NextLink href={`/profiles/${user.id}`} passHref>
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
        </NextLink>
        <NextLink href="/settings" passHref>
          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>
        </NextLink>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={handleLogout}
          disabled={logoutMutation.isPending || logoutMutation.isSuccess}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CurrentUserDropdown;

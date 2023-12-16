"use client";

import NextImage from "next/image";
import NextLink from "next/link";
import type { Image } from "~/api/types";
import { useAuth } from "~/context/auth";

type UserLike = { images?: Image[]; display_name?: string; name?: string, id: string };

export const UserDisplay = ({ user }: { user: UserLike }) => {
  const imageUrl = user.images?.[0]?.url ?? "";
  const username = user.display_name ?? user.name ?? "";

  return (
    <>
      <div>
        <NextImage
          src={imageUrl}
          height={20}
          width={20}
          alt="Profile image"
          className="rounded-full"
        />
      </div>
      <NextLink href={`/profiles/${user.id}`}>
        <span className="font-semibold hover:underline dark:text-white">
          {username}
        </span>
      </NextLink>
    </>
  );
};

export const CurrentUserDisplay = () => {
  const { user } = useAuth();

  if (!user) return null;

  return <UserDisplay user={user} />;
};


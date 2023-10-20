"use client";

import NextImage from "next/image";
import NextLink from "next/link";
import type { Image } from "~/api/types";
import { useAuth } from "~/context/auth";

type UserLike = { images: Image[]; display_name: string; id: string };

export const UserDisplay = ({ user }: { user: UserLike }) => {
  return (
    <>
      <div>
        <NextImage
          src={user.images[0]?.url ?? ""}
          height={20}
          width={20}
          alt=""
          className="rounded-full"
        />
      </div>
      <NextLink href={`/profiles/${user.id}`}>
        <span className="font-semibold hover:underline dark:text-white">
          {user.display_name}
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


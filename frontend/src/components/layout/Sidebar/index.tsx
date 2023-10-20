import {
  HeartIcon,
  HomeIcon,
  LibraryIcon,
  PlusIcon,
  SearchIcon,
} from "lucide-react";
import NextLink from "next/link";
import { Card } from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";
import { cn } from "~/lib/tailwind";
import "~/styles/globals.css";
import SidebarButtonLink from "./SidebarButtonLink";

const sidebarLinks = [
  { name: "Home", icon: <HomeIcon />, href: "/" },
  { name: "Search", icon: <SearchIcon />, href: "/search" },
  { name: "Library", icon: <LibraryIcon />, href: "/library" },
];

interface SidebarProps {
  className?: string;
  children?: React.ReactNode;
}

const Sidebar = ({ className, children }: SidebarProps) => {
  return (
    <aside className={cn("gap-2", className)}>
      <Card className="flex flex-col border-0 bg-gray-100 py-3 dark:bg-neutral-800">
        {sidebarLinks.map((link) => (
          <NextLink href={link.href} key={"link-" + link.name} passHref>
            <SidebarButtonLink icon={link.icon} name={link.name} />
          </NextLink>
        ))}
      </Card>
      <Card className="border-0 bg-gray-100 pt-3 dark:bg-neutral-800">
        <div>
          <SidebarButtonLink icon={<PlusIcon />} name="Create Playlist" />
          <NextLink href="/saved" passHref>
            <SidebarButtonLink icon={<HeartIcon />} name="Favourite Tracks" />
          </NextLink>
        </div>
        <Separator className="my-2" />
        <div className="h-[calc(100vh-400px)] overflow-auto">{children}</div>
      </Card>
    </aside>
  );
};

export default Sidebar;

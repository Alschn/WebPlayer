"use client";

import { MoreHorizontal } from "lucide-react";
import { Button } from "~/components/ui/button";
import { ModeToggle } from "~/components/ui/mode-toggle";
import { cn } from "~/lib/tailwind";
import "~/styles/globals.css";

interface HeaderProps {
  className?: string;
}

const Header = ({ className }: HeaderProps) => {
  const handleSettingsClick = () => {
    alert("Todo: handle settings click");
  };

  return (
    <header
      className={cn("flex h-12 items-center justify-between p-1", className)}
    >
      <Button variant="ghost" size="icon" onClick={handleSettingsClick}>
        <MoreHorizontal />
      </Button>
      <ModeToggle />
    </header>
  );
};

export default Header;

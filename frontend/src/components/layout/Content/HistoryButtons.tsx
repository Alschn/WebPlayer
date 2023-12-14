"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/tailwind";

interface HistoryButtonProps {
  className?: string;
}

export const HistoryBackButton = ({ className }: HistoryButtonProps) => {
  const router = useRouter();

  return (
    <Button
      variant="outline"
      size="icon"
      className={cn("rounded-full border-0", className)}
      onClick={() => router.back()}
    >
      <ChevronLeft />
    </Button>
  );
};

export const HistoryForwardButton = ({ className }: HistoryButtonProps) => {
  const router = useRouter();

  return (
    <Button
      variant="outline"
      size="icon"
      className={cn("rounded-full border-0", className)}
      onClick={() => router.forward()}
    >
      <ChevronRight />
    </Button>
  );
};

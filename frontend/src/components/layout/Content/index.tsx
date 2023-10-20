import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { cn } from "~/lib/tailwind";
import "~/styles/globals.css";
import CurrentUserDropdown from "./CurrentUserDropdown";

interface ContentProps {
  children: React.ReactNode;
  className?: string;
}

const Content = ({ children, className }: ContentProps) => {
  return (
    <Card
      className={cn(
        "flex h-full flex-shrink-0 flex-col border-0 bg-gray-100 px-4 py-2 dark:bg-neutral-800",
        className,
      )}
    >
      <div className="mb-4 flex">
        <nav className="flex gap-1">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full border-0"
          >
            <ChevronLeft />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full border-0"
          >
            <ChevronRight />
          </Button>
        </nav>
        <div id="nav-portal"></div>
        <div className="flex-grow-1 flex w-full"></div>
        <nav className="min-w-fit">
          <CurrentUserDropdown />
        </nav>
      </div>
      <main className="max-h-[calc(100vh-230px)] overflow-auto" id="main">
        {children}
      </main>
    </Card>
  );
};

export default Content;

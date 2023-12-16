import { SkipForwardIcon } from "lucide-react";
import { Button, type ButtonProps } from "~/components/ui/button";

export default function SkipForwardButton(props: ButtonProps) {
  return (
    <Button variant="ghost" size="icon" {...props}>
      <SkipForwardIcon />
    </Button>
  );
}

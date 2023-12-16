import { PlayCircleIcon } from "lucide-react";
import { Button, type ButtonProps } from "~/components/ui/button";

export default function PlayButton(props: ButtonProps) {
  return (
    <Button variant="ghost" size="icon" {...props}>
      <PlayCircleIcon />
    </Button>
  );
}

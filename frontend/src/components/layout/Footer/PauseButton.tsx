import { PauseCircleIcon } from "lucide-react";
import { Button, type ButtonProps } from "~/components/ui/button";

export default function PauseButton(props: ButtonProps) {
  return (
    <Button variant="ghost" size="icon" {...props}>
      <PauseCircleIcon />
    </Button>
  );
}

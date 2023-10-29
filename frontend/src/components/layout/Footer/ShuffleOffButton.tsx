import { ShuffleIcon } from "lucide-react";
import { Button, type ButtonProps } from "~/components/ui/button";

export default function ShuffleOffButton(props: ButtonProps) {
  return (
    <Button variant="ghost" size="icon" {...props}>
      <ShuffleIcon />
    </Button>
  );
}

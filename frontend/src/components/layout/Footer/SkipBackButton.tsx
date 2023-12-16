import { SkipBackIcon } from "lucide-react";
import { Button, type ButtonProps } from "~/components/ui/button";

export default function SkipBackButton(props: ButtonProps) {
  return (
    <Button variant="ghost" size="icon" {...props}>
      <SkipBackIcon />
    </Button>
  );
}

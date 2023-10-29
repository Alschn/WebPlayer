import { Repeat1Icon, Repeat2Icon, RepeatIcon } from "lucide-react";
import { Button, type ButtonProps } from "~/components/ui/button";

interface RepeatButtonProps extends ButtonProps {
  mode: number;
}

export default function RepeatModeButton({ mode, ...props }: RepeatButtonProps) {
  if (mode === 0)
    return (
      <Button variant="ghost" size="icon" {...props}>
        <RepeatIcon />
      </Button>
    );
  else if (mode === 1)
    return (
      <Button variant="ghost" size="icon" {...props}>
        <Repeat2Icon className="absolute text-green-500" />
        <span className="relative bottom-[-10px] right-0 text-lg font-bold text-green-500">
          .
        </span>
      </Button>
    );
  else if (mode === 2)
    return (
      <Button variant="ghost" size="icon" {...props}>
        <Repeat1Icon className="absolute text-green-500" />
        <span className="relative bottom-[-10px] right-0 text-lg font-bold text-green-500">
          .
        </span>
      </Button>
    );
  return null;
}

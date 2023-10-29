import { ShuffleIcon } from "lucide-react";
import { Button, type ButtonProps } from "~/components/ui/button";

export default function ShuffleOnButton(props: ButtonProps) {
  return (
    <Button variant="ghost" size="icon" {...props}>
      <ShuffleIcon className="absolute text-green-500" />
      <span className="relative bottom-[-10px] right-0 text-lg font-bold text-green-500">
        .
      </span>
    </Button>
  );
}

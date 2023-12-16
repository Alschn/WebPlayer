import { MonitorSpeakerIcon } from "lucide-react";
import { Button, type ButtonProps } from "~/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";

export default function DevicesButton(props: ButtonProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div>
          <Button variant="ghost" size="icon" {...props}>
            <MonitorSpeakerIcon />
          </Button>
        </div>
      </PopoverTrigger>
      <PopoverContent>TODO</PopoverContent>
    </Popover>
  );
}

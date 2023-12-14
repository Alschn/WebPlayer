import {
  Volume1Icon,
  Volume2Icon,
  VolumeIcon,
  VolumeXIcon,
} from "lucide-react";
import { Button, type ButtonProps } from "~/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";

function VolumeIconSwitch({ value }: { value: number }) {
  if (0.7 <= value) return <Volume2Icon />;
  else if (0.1 < value) return <Volume1Icon />;
  else if (0 < value && value <= 0.1) return <VolumeIcon />;
  else return <VolumeXIcon />;
}

interface VolumeButtonProps extends ButtonProps {
  value: number;
}

export default function VolumeButton({ value, ...props }: VolumeButtonProps) {
  return (
    <div>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" {...props}>
              <VolumeIconSwitch value={value} />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{value > 0 ? "Mute" : "Unmute"}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}

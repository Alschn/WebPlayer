import { HeartIcon } from "lucide-react";
import { cn } from "~/lib/tailwind";

const SavedTracksImage = ({
  className,
  iconClassName,
}: {
  className?: string;
  iconClassName?: string;
}) => {
  return (
    <div
      className={cn(
        "via-opacity-80 relative h-[250px] w-[250px] rounded-sm bg-gradient-to-br from-blue-800 via-purple-500 to-gray-300 shadow-md",
        className,
      )}
    >
      <HeartIcon
        size={100}
        fill="#ffffff"
        stroke="#ffffff"
        className={cn("absolute right-[75px] top-[75px]", iconClassName)}
      />
    </div>
  );
};

export default SavedTracksImage;

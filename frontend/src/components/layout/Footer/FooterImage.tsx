import NextImage, { type ImageProps as NextImageProps } from "next/image";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import "~/styles/globals.css";

interface FooterImageProps {
  track: Spotify.Track;
  imageProps?: NextImageProps;
}

export default function FooterImage({ track }: FooterImageProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <NextImage
          src={track.album.images[0]?.url ?? ""}
          alt={track.name}
          width={64}
          height={64}
          className="cursor-pointer"
        />
      </PopoverTrigger>
      <PopoverContent>TODO</PopoverContent>
    </Popover>
  );
}

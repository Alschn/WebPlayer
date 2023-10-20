"use client";

import { Tooltip } from "@radix-ui/react-tooltip";
import {
  ListMusicIcon,
  MonitorSpeakerIcon,
  PauseCircleIcon,
  PlayCircleIcon,
  PlaySquareIcon,
  Repeat1Icon,
  Repeat2Icon,
  RepeatIcon,
  ShuffleIcon,
  SkipBackIcon,
  SkipForwardIcon,
  VolumeIcon,
  Volume2Icon,
  Volume1Icon,
  VolumeXIcon,
} from "lucide-react";
import NextImage from "next/image";
import NextLink from "next/link";
import { useState } from "react";
import {
  usePlaybackState,
  useSpotifyPlayer,
} from "react-spotify-web-playback-sdk";
import { Button } from "~/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { Slider } from "~/components/ui/slider";
import {
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { getMsToTimeString, uriToId } from "~/lib/format";
import { cn } from "~/lib/tailwind";
import "~/styles/globals.css";

interface FooterProps {
  className?: string;
}

function VolumeIconSwitch({ volume }: { volume: number }) {
  if (0.7 <= volume) return <Volume2Icon />;
  else if (0.1 < volume) return <Volume1Icon />;
  else if (0 < volume && volume <= 0.1) return <VolumeIcon />;
  else return <VolumeXIcon />;
}

function Footer({ className }: FooterProps) {
  const player = useSpotifyPlayer();
  const state = usePlaybackState();

  const [trackPos, setTrackPos] = useState<[number]>([0]);
  const [volume, setVolume] = useState<[number]>([0.3]);

  if (!player || !state) return null;

  const position = state.position;
  const duration = state.duration;
  const track = state.track_window.current_track;
  const isPaused = state.paused;
  const repeatMode = state.repeat_mode;
  const isShuffled = state.shuffle;

  const handlePositionCommit = async (values: [number]) => {
    const value = values[0];
    await player.seek(value).then(() => setTrackPos(values));
  };

  const handleVolumeCommit = async (values: [number]) => {
    const value = values[0];
    await player.setVolume(value).then(() => setVolume(values));
  };

  const handleShuffleClick = () => {
    alert("Todo: shuffle");
  };

  const handlePrevClick = async () => {
    await player.previousTrack();
  };

  const handlePausePlayClick = async () => {
    await player.togglePlay();
  };

  const handleNextClick = async () => {
    await player.nextTrack();
  };

  const handleRepeatClick = () => {
    alert("Todo: repeat mode");
  };

  const handleMute = async () => {
    await player.setVolume(0).then(() => setVolume([0]));
  };

  const handleUnmute = async () => {
    await player.setVolume(0.3).then(() => setVolume([0.3]));
  };

  return (
    <footer
      className={cn(
        "hidden h-24 w-full grid-cols-12 rounded-none border-0 bg-transparent p-3 shadow-none md:grid",
        className,
      )}
    >
      <div
        id="footer-left"
        className="flex items-center justify-start gap-3 md:col-span-3"
      >
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
        <div className="flex flex-col">
          <NextLink href={`/tracks/${track.id}/`}>
            <h1 className="text-base hover:underline">{track.name}</h1>
          </NextLink>
          <div className="flex flex-row gap-1">
            {track.artists.map((a) => (
              <NextLink
                href={`/artists/${uriToId(a.uri)}/`}
                key={"footer-artist-" + a.uri}
              >
                <h2 className="text-sm text-gray-600 hover:underline dark:text-gray-400">
                  {a.name}
                </h2>
              </NextLink>
            ))}
          </div>
        </div>
      </div>
      <div className="md:col-span-6">
        <div
          id="footer-center"
          className="flex flex-col items-center justify-center"
        >
          <div className="align-center flex">
            {isShuffled ? (
              <Button variant="ghost" size="icon" onClick={handleShuffleClick}>
                <ShuffleIcon className="absolute text-green-500" />
                <span className="relative bottom-[-10px] right-0 text-lg font-bold text-green-500">
                  .
                </span>
              </Button>
            ) : (
              <Button variant="ghost" size="icon" onClick={handleShuffleClick}>
                <ShuffleIcon />
              </Button>
            )}
            <Button variant="ghost" size="icon" onClick={handlePrevClick}>
              <SkipBackIcon />
            </Button>
            <Button variant="ghost" size="icon" onClick={handlePausePlayClick}>
              {isPaused ? <PlayCircleIcon /> : <PauseCircleIcon />}
            </Button>
            <Button variant="ghost" size="icon" onClick={handleNextClick}>
              <SkipForwardIcon />
            </Button>
            {repeatMode === 0 && (
              <Button variant="ghost" size="icon" onClick={handleRepeatClick}>
                <RepeatIcon />
              </Button>
            )}
            {repeatMode === 1 && (
              <Button variant="ghost" size="icon" onClick={handleRepeatClick}>
                <Repeat2Icon className="absolute text-green-500" />
                <span className="relative bottom-[-10px] right-0 text-lg font-bold text-green-500">
                  .
                </span>
              </Button>
            )}
            {repeatMode === 2 && (
              <Button variant="ghost" size="icon" onClick={handleRepeatClick}>
                <Repeat1Icon className="absolute text-green-500" />
                <span className="relative bottom-[-10px] right-0 text-lg font-bold text-green-500">
                  .
                </span>
              </Button>
            )}
          </div>
        </div>
        <div className="flex flex-row items-center justify-center gap-2">
          <span className="text-base">{getMsToTimeString(position, true)}</span>
          <Slider
            className="max-w-lg lg:max-w-2xl"
            value={trackPos}
            min={0}
            max={duration}
            onValueChange={(values) => setTrackPos(values as [number])}
            onValueCommit={handlePositionCommit}
          />
          <span className="text-base">{getMsToTimeString(duration, true)}</span>
        </div>
      </div>
      <div
        id="footer-right"
        className="flex items-center justify-end md:col-span-3"
      >
        <div className="flex">
          <Popover>
            <PopoverTrigger asChild>
              <div>
                <Button variant="ghost" size="icon">
                  <PlaySquareIcon />
                </Button>
              </div>
            </PopoverTrigger>
            <PopoverContent>TODO</PopoverContent>
          </Popover>
          <NextLink href="/queue" passHref>
            <Button variant="ghost" size="icon">
              <ListMusicIcon />
            </Button>
          </NextLink>
          <Popover>
            <PopoverTrigger asChild>
              <div>
                <Button variant="ghost" size="icon">
                  <MonitorSpeakerIcon />
                </Button>
              </div>
            </PopoverTrigger>
            <PopoverContent>TODO</PopoverContent>
          </Popover>
          <div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  {volume[0] > 0 ? (
                    <Button variant="ghost" size="icon" onClick={handleMute}>
                      <VolumeIconSwitch volume={volume[0]} />
                    </Button>
                  ) : (
                    <Button variant="ghost" size="icon" onClick={handleUnmute}>
                      <VolumeIconSwitch volume={0} />
                    </Button>
                  )}
                </TooltipTrigger>
                <TooltipContent>
                  <p>{volume[0] > 0 ? "Mute" : "Unmute"}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Slider
            className="min-w-[100px] max-w-[150px]"
            min={0.0}
            max={1.0}
            step={0.01}
            value={volume}
            onValueChange={(value) => setVolume(value as [number])}
            onValueCommit={handleVolumeCommit}
          />
        </div>
      </div>
    </footer>
  );
}

export default Footer;

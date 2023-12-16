"use client";

import NextLink from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  usePlaybackState,
  useSpotifyPlayer,
} from "react-spotify-web-playback-sdk";
import { setPlayerRepeatMode, setPlayerShuffle } from "~/api/player";
import { Slider } from "~/components/ui/slider";
import { getMsToTimeString, uriToId } from "~/lib/format";
import { cn } from "~/lib/tailwind";
import "~/styles/globals.css";
import DevicesButton from "./DevicesButton";
import FooterImage from "./FooterImage";
import NowPlayingButton from "./NowPlayingButton";
import PauseButton from "./PauseButton";
import PlayButton from "./PlayButton";
import QueueButtonLink from "./QueueButtonLink";
import RepeatModeButton from "./RepeatModeButton";
import ShuffleOffButton from "./ShuffleOffButton";
import ShuffleOnButton from "./ShuffleOnButton";
import SkipBackButton from "./SkipBackButton";
import SkipForwardButton from "./SkipForwardButton";
import VolumeButton from "./VolumeButton";

interface FooterProps {
  className?: string;
}

function Footer({ className }: FooterProps) {
  const player = useSpotifyPlayer();
  const state = usePlaybackState();

  const [trackPos, setTrackPos] = useState<[number]>([state?.position ?? 0]);
  const [volume, setVolume] = useState<[number]>([0.3]);
  const prevVolume = useRef<number>(volume[0]);

  useEffect(() => {
    if (!state) return;
    setTrackPos([state.position]);
  }, [state]);

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
    prevVolume.current = volume[0];
    const value = values[0];
    await player.setVolume(value).then(() => setVolume(values));
  };

  const handleShuffleClick = async () => {
    await setPlayerShuffle(!isShuffled);
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

  const handleRepeatClick = async () => {
    let nextMode = repeatMode + 1;
    if (nextMode > 2) nextMode = 0;
    await setPlayerRepeatMode(nextMode as Spotify.PlaybackState["repeat_mode"]);
  };

  const handleToggleMute = async () => {
    const currentVolume = volume[0];

    if (currentVolume > 0) {
      prevVolume.current = currentVolume;
      await player.setVolume(0).then(() => setVolume([0]));
    } else {
      await player
        .setVolume(prevVolume.current)
        .then(() => setVolume([prevVolume.current]));
    }
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
        <FooterImage track={track} />
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
              <ShuffleOnButton onClick={handleShuffleClick} />
            ) : (
              <ShuffleOffButton onClick={handleShuffleClick} />
            )}
            <SkipBackButton onClick={handlePrevClick} />
            {isPaused ? (
              <PlayButton onClick={handlePausePlayClick} />
            ) : (
              <PauseButton onClick={handlePausePlayClick} />
            )}
            <SkipForwardButton onClick={handleNextClick} />
            <RepeatModeButton mode={repeatMode} onClick={handleRepeatClick} />
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
          <NowPlayingButton />
          <QueueButtonLink />
          <DevicesButton />
          <VolumeButton value={volume[0]} onClick={handleToggleMute} />
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

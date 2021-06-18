import TimeAgo from "javascript-time-ago";
import {SpotifyArtistObject} from "../types/spotify";

export const getArtistsString = (artists: SpotifyArtistObject[]): string => {
  return artists.reduce((total, {name}, currentIndex, arr) => (
    total += currentIndex !== arr.length - 1 ? `${name}, ` : name
  ), ``)
};

export const getPlaylistLength = (tracks: any[]): string => {
  if (tracks) {
      let length = 0;
      tracks.forEach(({duration_ms}) => length += duration_ms)
      return getMsToTime(length);
    }
    return '';
}

export const getMsToTime = (ms: number, colon_separated = false): string => {
  const seconds: number = Math.floor(ms / 1000);
  const minutes: number = Math.floor(ms / (1000 * 60));
  const hours: number = Math.floor(ms / (1000 * 60 * 60));
  const days: number = Math.floor(ms / (1000 * 60 * 60 * 24));

  const cutSeconds: number = seconds > 60 ? seconds - minutes * 60 : seconds;
  const cutMinutes: number = minutes > 60 ? minutes - hours * 60 : minutes;
  const cutHours: number = hours > 24 ? hours - days * 24 : hours;

  const formatCutSeconds: string = cutSeconds < 10 ? `0${cutSeconds}` : String(cutSeconds);
  const formatCutMinutes: string = cutMinutes < 10 ? `0${cutMinutes}` : String(cutMinutes);
  const formatCutHours: string = cutHours < 10 ? `0${cutHours}` : String(cutHours);

  if (seconds < 60)
    return colon_separated ? `0:${formatCutSeconds}` : `${seconds} sec`;
  else if (minutes < 60)
    return colon_separated ? `${minutes}:${formatCutSeconds}` : `${minutes} min ${cutSeconds} sec`;
  else if (hours < 24)
    return colon_separated ? `${hours}:${formatCutMinutes}:${formatCutSeconds}` : `${hours} hrs ${cutMinutes} min`;
  else
    return colon_separated ?
      `${days}:${formatCutHours}:${cutMinutes}:${formatCutSeconds}` :
      `${days} days ${cutHours} hrs`;
}

export const getTimePassedSinceAdded = (added_at: string): string => {
  const timeAgo = new TimeAgo('en-US');
  const diff: number = new Date().getTime() - new Date(added_at).getTime();
  return timeAgo.format(Date.now() - diff)
};

export function getMsToTimeString(ms: number, colon_separated = false) {
  const seconds: number = Math.floor(ms / 1000);
  const minutes: number = Math.floor(ms / (1000 * 60));
  const hours: number = Math.floor(ms / (1000 * 60 * 60));
  const days: number = Math.floor(ms / (1000 * 60 * 60 * 24));

  const cutSeconds: number = seconds > 60 ? seconds - minutes * 60 : seconds;
  const cutMinutes: number = minutes > 60 ? minutes - hours * 60 : minutes;
  const cutHours: number = hours > 24 ? hours - days * 24 : hours;

  const formatCutSeconds: string =
    cutSeconds < 10 ? `0${cutSeconds}` : String(cutSeconds);
  const formatCutMinutes: string =
    cutMinutes < 10 ? `0${cutMinutes}` : String(cutMinutes);
  const formatCutHours: string =
    cutHours < 10 ? `0${cutHours}` : String(cutHours);

  if (seconds < 60)
    return colon_separated ? `0:${formatCutSeconds}` : `${seconds} sec`;
  else if (minutes < 60)
    return colon_separated
      ? `${minutes}:${formatCutSeconds}`
      : `${minutes} min ${cutSeconds} sec`;
  else if (hours < 24)
    return colon_separated
      ? `${hours}:${formatCutMinutes}:${formatCutSeconds}`
      : `${hours} hrs ${cutMinutes} min`;
  else
    return colon_separated
      ? `${days}:${formatCutHours}:${cutMinutes}:${formatCutSeconds}`
      : `${days} days ${cutHours} hrs`;
}

const units: { unit: Intl.RelativeTimeFormatUnit; ms: number }[] = [
  { unit: "year", ms: 31536000000 },
  { unit: "month", ms: 2628000000 },
  { unit: "day", ms: 86400000 },
  { unit: "hour", ms: 3600000 },
  { unit: "minute", ms: 60000 },
  { unit: "second", ms: 1000 },
];
const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

/**
 * Get language-sensitive relative time message from Dates.
 * @param relative  - the relative dateTime, generally is in the past or future
 * @param pivot     - the dateTime of reference, generally is the current time
 */
export function relativeTimeFromDates(
  relative: Date | null,
  pivot: Date = new Date(),
): string {
  if (!relative) return "";
  const elapsed = relative.getTime() - pivot.getTime();
  return relativeTimeFromElapsed(elapsed);
}

/**
 * Get language-sensitive relative time message from elapsed time.
 * @param elapsed   - the elapsed time in milliseconds
 */
export function relativeTimeFromElapsed(elapsed: number): string {
  for (const { unit, ms } of units) {
    if (Math.abs(elapsed) >= ms || unit === "second") {
      return rtf.format(Math.round(elapsed / ms), unit);
    }
  }
  return "";
}

export function uriToId(uri: string) {
  const splitByColon = uri.split(":");
  return splitByColon[2] ?? "";
}

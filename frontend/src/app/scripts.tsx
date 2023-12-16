import Script from "next/script";

const SPOTIFY_WEB_PLAYBACK_SDK_URL = "https://sdk.scdn.co/spotify-player.js";

export const SpotifyWebPlaybackSDKScript = () => {
  return (
    <Script
      id="spotify-web-playback-sdk-script"
      src={SPOTIFY_WEB_PLAYBACK_SDK_URL}
      strategy="afterInteractive"
      onLoad={() => {
        console.debug("Spotify Web Playback SDK loaded");
      }}
      onReady={() => {
        console.debug("Spotify Web Playback SDK ready");
      }}
      onError={(e) => {
        console.debug("Spotify Web Playback SDK error", e);
      }}
    />
  );
};

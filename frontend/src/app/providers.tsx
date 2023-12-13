"use client";

import { type ReactNode } from "react";
import WebPlaybackProvider from "~/providers/spotify";
import TanstackQueryClientProvider from "~/providers/tanstack-query";
import { AuthContextProvider } from "~/context/auth";
import { SpotifyWebPlaybackSDKScript } from "./scripts";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <TanstackQueryClientProvider>
      <AuthContextProvider>
        {/* <SpotifyWebPlaybackSDKScript /> */}
        <WebPlaybackProvider>{children}</WebPlaybackProvider>
      </AuthContextProvider>
    </TanstackQueryClientProvider>
  );
}

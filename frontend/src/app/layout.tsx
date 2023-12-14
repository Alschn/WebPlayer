import "~/styles/globals.css";

import { Inter } from "next/font/google";
import { cn } from "~/lib/tailwind";
import { ThemeProvider } from "~/providers/theme";
import Providers from "./providers";
import { Toaster } from "~/components/ui/toaster";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Web Player",
  description: "Spotify clone built with Next.js, Tailwind CSS, Shadcn.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <body
          className={cn(
            "overflow-y-hidden bg-gray-200 font-sans antialiased dark:bg-black",
            inter.variable,
          )}
        >
          <Toaster />
          <Providers>{children}</Providers>
        </body>
      </ThemeProvider>
    </html>
  );
}

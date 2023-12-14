import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { env } from "~/env.mjs";
import NextLink from "next/link";
import SpotifyIcon from "~/components/icons/Spotify";

function getSpotifyLoginUrl() {
  return fetch(`${env.NEXT_PUBLIC_API_URL}/api/auth/spotify/url/`, {
    method: "GET",
    cache: "force-cache",
  });
}

const LoginPage = async () => {
  const res = await getSpotifyLoginUrl();
  const data = (await res.json()) as { url: string };
  const externalUrl = data.url;

  // todo: credentials login (maybe with server actions)

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="min-w-[400px]">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl">Sign In</CardTitle>
          <CardDescription>
            Log in with Spotify or your credentials
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-6">
            <NextLink href={externalUrl} passHref>
              <Button variant="outline" className="w-full">
                <SpotifyIcon className="mr-2 h-4 w-4" />
                Spotify
              </Button>
            </NextLink>
          </div>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Username</Label>
            <Input id="email" type="email" placeholder="Username" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="Password" />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Log In</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginPage;

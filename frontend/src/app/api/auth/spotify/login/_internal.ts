import { env } from "~/env.mjs";

type AccessTokens = {
  access_token: string;
  refresh_token: string;
  expires_in: number;
};

type AuthKey = {
  key: string;
};

function getSpotifyAccessToken(code: string) {
  return fetch(`${env.NEXT_PUBLIC_API_URL}/api/auth/spotify/access/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ code }),
  });
}

function loginWithSpotify(accessTokens: AccessTokens) {
  return fetch(`${env.NEXT_PUBLIC_API_URL}/api/auth/spotify/login/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(accessTokens),
  });
}

export {
  getSpotifyAccessToken,
  loginWithSpotify,
  type AccessTokens,
  type AuthKey,
};

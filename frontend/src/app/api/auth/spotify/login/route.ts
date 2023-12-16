import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import {
  getSpotifyAccessToken,
  loginWithSpotify,
  type AccessTokens,
  type AuthKey,
} from "./_internal";

function makeSuccessResponse(key: string) {
  const response = NextResponse.json(
    { key },
    {
      status: 200,
      statusText: "OK",
    },
  );
  response.cookies.set("token", key, {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return response;
}

const schema = z.object({
  code: z.string(),
});

export async function POST(request: NextRequest) {
  let parsed;

  try {
    const body = (await request.json()) as unknown;
    parsed = schema.parse(body);
  } catch {
    return new NextResponse("Invalid request body", {
      status: 400,
      statusText: "Bad Request",
    });
  }
  // request spotify access token using code from callback
  const tokenResponse = await getSpotifyAccessToken(parsed.code);

  if (!tokenResponse.ok)
    return new NextResponse(tokenResponse.body, tokenResponse);

  const accessTokens = (await tokenResponse.json()) as AccessTokens;

  // exchange access tokens for api auth key
  const authResponse = await loginWithSpotify(accessTokens);

  if (!authResponse.ok)
    return new NextResponse(authResponse.body, authResponse);

  const authKey = (await authResponse.json()) as AuthKey;

  // build response with token cookie
  return makeSuccessResponse(authKey.key);
}

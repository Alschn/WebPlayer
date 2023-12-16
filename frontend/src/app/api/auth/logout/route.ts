import { type NextRequest, NextResponse } from "next/server";
import { env } from "~/env.mjs";

export async function POST(request: NextRequest) {
  const token = request.cookies.get("token")?.value ?? "";

  let res;

  try {
    res = await fetch(`${env.NEXT_PUBLIC_API_URL}/api/auth/logout/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    });
    if (!res.ok) {
      const body = (await res.json()) as unknown;
      return NextResponse.json(body, { status: res.status });
    }
  } catch (e) {
    return NextResponse.json(
      { error: "Something went wrong..." },
      { status: 500 },
    );
  }

  const response = NextResponse.json(
    { message: "Successfully logged out!" },
    { status: 200 },
  );
  response.cookies.delete("token");
  return response;
}

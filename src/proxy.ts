import { NextResponse, type NextRequest } from "next/server";
import { API_BASE_URL } from "@/lib/api";

function redirectToLogin(request: NextRequest) {
  return NextResponse.redirect(new URL("/login", request.url));
}

export async function proxy(request: NextRequest) {
  const cookie = request.headers.get("cookie");
  if (!cookie) {
    return redirectToLogin(request);
  }

  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}/api/auth/get-session`, {
      cache: "no-store",
      headers: { cookie },
    });
  } catch {
    return NextResponse.json(
      { message: "The authentication service is unavailable." },
      { status: 503 },
    );
  }

  if (response.status >= 500) {
    return NextResponse.json(
      { message: "The authentication service is unavailable." },
      { status: 503 },
    );
  }

  if (!response.ok) {
    return redirectToLogin(request);
  }

  try {
    const session = await response.json();
    if (!session?.user?.id) {
      return redirectToLogin(request);
    }
  } catch {
    return NextResponse.json(
      { message: "The authentication service returned an invalid response." },
      { status: 503 },
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/add-book/:path*",
    "/my-books/:path*",
    "/my-borrows/:path*",
    "/profile/:path*",
  ],
};

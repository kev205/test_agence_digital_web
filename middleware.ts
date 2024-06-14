import type { NextRequest } from "next/server";
import { getSession } from "./lib/session";

export async function middleware(request: NextRequest) {
  const currentUser = await getSession();

  if (!currentUser && !request.nextUrl.pathname.startsWith("/login")) {
    return Response.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/carts/:path", "/profile/:path"],
};

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const guestToken = req.cookies.get("guestAuthToken");
  const mainToken = req.cookies.get("mainAuthToken");
  const currentPath = req.nextUrl.pathname;

  console.log(
    "Middleware triggered. Guest token:",
    guestToken,
    "Main token:",
    mainToken
  );

  // Restrict access based on the current route
  if (currentPath.startsWith("/guest-admin")) {
    if (!guestToken) {
      // Redirect to the guest login page if the guest admin is not authenticated
      const loginUrl = new URL("/guest-login", req.url);
      return NextResponse.redirect(loginUrl);
    }
  } else if (currentPath.startsWith("/main-admin")) {
    if (!mainToken) {
      // Redirect to the main login page if the main admin is not authenticated
      const loginUrl = new URL("/main-login", req.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Allow access to the route if authenticated correctly
  return NextResponse.next();
}

// Apply middleware only to specific routes
export const config = {
  matcher: ["/guest-admin/:path*", "/main-admin/:path*"], // Protect both routes
};

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  // Check for authentication (e.g., a cookie named "authToken")
  const authToken = req.cookies.get("authToken");
  console.log("Middleware triggered. Auth token:", authToken);

  if (!authToken) {
    // Redirect to the login page if not authenticated
    const loginUrl = new URL("/guest-login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  // Allow access to the route if authenticated
  return NextResponse.next();
}

// Apply middleware only to the guest-admin route
export const config = {
  matcher: "/guest-admin/:path*", // Protect all routes under /guest-admin
};

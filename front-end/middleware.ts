import { jwtDecode } from "jwt-decode";
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const user: any = jwtDecode(req.nextauth.token?.accessToken as string)
    if (req.nextUrl.pathname.startsWith("/admin") && user.role !== 'ADMIN') {
      return NextResponse.redirect(
        new URL("/error", req.url)
      );
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        return !!token
      }
    },
  }
);

export const config = {
  matcher: ["/admin/:path*", "/cabinet"],
};
import { NextResponse, NextRequest } from "next/server";
import { TokenPayload, verifyToken } from "@/lib/jwt";

export async function middleware(request: NextRequest) {
  try {
    const token = request.cookies.get("token");

    const pathname = request.nextUrl.pathname;

    if (!token) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    const payload = await verifyToken<TokenPayload>(token.value);

    if (!payload) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    const role = payload.user.userRole;

    if (!role) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    if (pathname.startsWith("/dashboard/admin") && role !== "ADMIN") {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }

    if (pathname.startsWith("/dashboard/user") && role !== "USER") {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }

    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}
export const config = {
  matcher: ["/dashboard/admin/:path*", "/dashboard/user/:path*"],
};

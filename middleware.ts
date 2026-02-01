import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const DASHBOARD_ROLES = ["Administrator", "Manager", "Employee"];

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET!
);

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const path = request.nextUrl.pathname;


// 1️⃣ If user is logged in and tries to open login
if (path === "/auth/login" && token) {
  return NextResponse.redirect(new URL("/dashboard", request.url));
}

// 2️⃣ Protect dashboard
if (path.startsWith("/dashboard")) {
  if (!token) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
}


  if (!token) {
    return NextResponse.redirect(
      new URL("/auth/login", request.url)
    );
  }

  try {
    const { payload } = await jwtVerify(token, JWT_SECRET, {
      issuer: "KahiyeAuthServer",
      audience: "KahiyeWebApp",
    });


    const role =
      payload.role ||
      payload[
        "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
      ];


    if (!DASHBOARD_ROLES.includes(role as string)) {
      return NextResponse.redirect(
        new URL("/", request.url)
      );
    }

    return NextResponse.next();
  } catch (err) {
    return NextResponse.redirect(
      new URL("/auth/login", request.url)
    );
  }
}

export const config = {
  matcher: ["/dashboard/:path*"],
};

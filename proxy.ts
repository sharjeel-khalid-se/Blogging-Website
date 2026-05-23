import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export function proxy(request: NextRequest) {
  const token = request.cookies.get("auth_token")?.value;

  const { pathname } = request.nextUrl;

  // 3. Public Routes define karein (jo bina token ke open ho sakte hain)
  const isPublicRoute =
    pathname === "/" || pathname === "/login" || pathname === "/signup";

  if (!token && !isPublicRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 4. Agar token HAI toh verify karein
  if (token) {
    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      jwtVerify(token, secret);
      if (pathname === "/login" || pathname === "/signup") {
        return NextResponse.redirect(new URL("/", request.url));
      }
    } catch (err) {
      console.log("Token verification failed:", err);
      const response = NextResponse.redirect(new URL("/login", request.url));
      response.cookies.delete("auth_token");
      if (isPublicRoute) {
        return response;
      }
    }
  }
}

// Yeh config batata hai ke proxy kin pages par chalna chahiye.
// Is regex ka matlab hai ke yeh API routes aur static files (images, css) ko chhor kar baqi sab par chalega.
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

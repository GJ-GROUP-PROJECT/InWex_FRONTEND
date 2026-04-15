import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function proxy(request: NextRequest) {
    const token = request.cookies.get("token")?.value
    const pathname = request.nextUrl.pathname

    if (token && pathname.startsWith("/auth")) {
        return NextResponse.redirect(new URL("/dashboard", request.url))
    }

    if (!token && !pathname.startsWith("/auth")) {
        return NextResponse.redirect(new URL("/auth", request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ["/dashboard/:path*", "/auth/:path*"],
}
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const publicAuthRoutes = [
    "/auth",
    "/auth/register",
    "/auth/forgot-password",
    "/auth/verify"
]

export function proxy(request: NextRequest) {
    const token = request.cookies.get("token")?.value
    const pathname = request.nextUrl.pathname

    const allowOtp = request.cookies.get("allow_otp")?.value
    const allowReset = request.cookies.get("allow_reset")?.value

    const isPublicAuthRoute = publicAuthRoutes.some(route =>
        pathname.startsWith(route)
    )

    // Logged in users blocked from auth pages
    if (token && pathname.startsWith("/auth")) {
        return NextResponse.redirect(new URL("/dashboard", request.url))
    }

    // Dashboard protection
    if (!token && pathname.startsWith("/dashboard")) {
        return NextResponse.redirect(new URL("/auth", request.url))
    }

    // OTP flow protection
    if (pathname.startsWith("/auth/otp") && !allowOtp) {
        return NextResponse.redirect(new URL("/auth/forgot-password", request.url))
    }
    // Reset flow protection
    if (pathname.startsWith("/auth/reset") && !allowReset) {
        return NextResponse.redirect(new URL("/auth/forgot-password", request.url))
    }

    // Unknown auth routes
    if (
        !token &&
        pathname.startsWith("/auth") &&
        !isPublicAuthRoute &&
        !pathname.startsWith("/auth/otp") &&
        !pathname.startsWith("/auth/reset")
    ) {
        return NextResponse.redirect(new URL("/auth", request.url))
    }

    return NextResponse.next()
}
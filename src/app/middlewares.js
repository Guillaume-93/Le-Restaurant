// middleware.js
import { NextResponse } from 'next/server';
import { getAuthSession } from '@/lib/auth';

export async function middleware(context) {
    const session = await getAuthSession(context);

    console.log("[Middleware] Session:", session);

    if (!session || session.user.role !== 'admin') {
        console.log("[Middleware] User not authorized, redirecting to /login.");
        return NextResponse.redirect(new URL('/login', context.req.url));
    }

    console.log("[Middleware] User authorized, allowing access.");
    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*'],
};

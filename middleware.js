import { NextResponse } from 'next/server';
import { getIronSession } from 'iron-session';
import createMiddleware from 'next-intl/middleware';
import { routing } from './lib/i18n/routing';

const intlMiddleware = createMiddleware(routing);

const sessionOptions = {
  cookieName: 'awgp_admin_session',
  password: process.env.SESSION_SECRET || 'awgp-secret-change-in-production-min32chars',
  cookieOptions: { secure: process.env.NODE_ENV === 'production' },
};

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  // ── Admin routes: never run i18n (no locale prefix) ──
  if (pathname.startsWith('/admin')) {
    // Login page is public.
    if (pathname.startsWith('/admin/login')) {
      return NextResponse.next();
    }

    const response = NextResponse.next();
    const session = await getIronSession(request, response, sessionOptions);

    if (!session.isLoggedIn) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
    return response;
  }

  // ── i18n routing for all public pages ──
  return intlMiddleware(request);
}

export const config = {
  matcher: [
    // Run intl on all public paths
    '/((?!_next|_vercel|api|admin|.*\\..*).*)',
    // Run auth check on admin paths
    '/admin/:path*',
  ],
};

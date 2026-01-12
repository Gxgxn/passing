import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isExclusive = pathname === '/exclusive';
  const isHome = pathname === '/';

  // Intercept both Home and Exclusive routes
  if (isExclusive || isHome) {
    // RELAXED MIDDLEWARE: Only check for the "visited" cookie.
    // We delegate the robust/public-wifi safe check to the Client-Side Gatekeeper.
    const cookie = request.cookies.get('visited');
    
    // If cookie exists, block access immediately (Fast Fail)
    if (cookie) {
      return NextResponse.redirect(new URL('/expired', request.url));
    }

    // If no cookie, we ALLOW the request to proceed.
    // The Gatekeeper component on /exclusive will handle the robust fingerprint check.
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/exclusive'],
};

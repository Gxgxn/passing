import { NextResponse, userAgent } from 'next/server';
import type { NextRequest } from 'next/server';
import { redis } from '@/lib/redis';

// Generate server-side fingerprint for quick checks
async function getServerFingerprint(request: NextRequest): Promise<string> {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  const ip = forwarded ? forwarded.split(',')[0].trim() : realIp ?? '127.0.0.1';
  
  const { os, device } = userAgent(request);
  const rawSignature = `${ip}|${os.name}|${device.model}`;
  
  const msgUint8 = new TextEncoder().encode(rawSignature);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isExclusive = pathname === '/exclusive';
  const isHome = pathname === '/';

  if (isExclusive || isHome) {
    const cookie = request.cookies.get('visited');
    
    // Fast path: Cookie check (immediate redirect)
    if (cookie) {
      return NextResponse.redirect(new URL('/expired', request.url));
    }

    // Medium path: Server-side fingerprint check (fast, but less robust)
    try {
      const serverFp = await getServerFingerprint(request);
      const hasVisited = await redis.get(`fp:${serverFp}`);
      
      if (hasVisited) {
        // Known user detected via server fingerprint → immediate redirect
        return NextResponse.redirect(new URL('/expired', request.url));
      }
    } catch (error) {
      console.error('Server fingerprint check failed:', error);
      // Continue to allow Gatekeeper to handle verification
    }

    // New user: Allow through to page
    // Gatekeeper will run robust client-side fingerprint check
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/exclusive'],
};

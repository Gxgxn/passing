import { NextResponse, userAgent } from 'next/server';
import type { NextRequest } from 'next/server';
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

async function generateFingerprint(request: NextRequest): Promise<string> {
  // Extract IP from headers (x-forwarded-for is set by Vercel and most proxies)
  const forwarded = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  const ip = forwarded ? forwarded.split(',')[0].trim() : (realIp ?? '127.0.0.1');

  // Get structured UA data for OS/Device detection only
  const { os, device } = userAgent(request);
  
  // ROBUST FINGERPRINT: IP + OS + Device
  // We explicitly ignore browser name, version, and raw UA string 
  // to ensure the lock persists if the user switches browsers (e.g. Chrome -> Firefox)
  const rawSignature = `${ip}|${os.name}|${device.model}`;

  // Hash the signature using SHA-256
  const msgUint8 = new TextEncoder().encode(rawSignature);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only intercept /exclusive route
  if (pathname === '/exclusive') {
    const fingerprint = await generateFingerprint(request);
    const cookie = request.cookies.get('visited');

    // Check Redis for this specific device fingerprint
    let hasVisitedBefore = false;
    try {
      hasVisitedBefore = !!(await redis.get(`fp:${fingerprint}`));
    } catch (error) {
      console.error('Redis error:', error);
      // Continue with cookie-only check if Redis fails
    }

    // Double-lock: either cookie OR fingerprint blocks access
    if (cookie || hasVisitedBefore) {
      return NextResponse.redirect(new URL('/expired', request.url));
    }

    // Set persistence in Redis
    try {
      await redis.set(`fp:${fingerprint}`, 'true', { ex: 60 * 60 * 24 * 365 }); // 1 year TTL
    } catch (error) {
      console.error('Redis set error:', error);
    }

    // Set cookie and allow access
    const response = NextResponse.next();
    response.cookies.set('visited', 'true', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 365, // 1 year
    });

    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/exclusive',
};

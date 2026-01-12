'use server'

import { redis } from '@/lib/redis'
import { cookies } from 'next/headers'

export type VerificationResult = 'ALLOWED' | 'LOCKED'

export async function verifyVisitor(visitorId: string): Promise<VerificationResult> {
  try {
    // Check if this specific hardware ID has visited before
    const hasVisited = await redis.get(`fp:${visitorId}`)

    if (hasVisited) {
      return 'LOCKED'
    }

    // If new, mark as visited (CLOSING THE DOOR)
    // 1 year TTL
    await redis.set(`fp:${visitorId}`, 'true', { ex: 60 * 60 * 24 * 365 })

    // Also set the cookie as a backup/fast-fail
    const cookieStore = await cookies()
    cookieStore.set('visited', 'true', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 365,
    })

    return 'ALLOWED'
  } catch (error) {
    console.error('verifyVisitor error:', error)
    // On error, lock out to be safe
    return 'LOCKED'
  }
}

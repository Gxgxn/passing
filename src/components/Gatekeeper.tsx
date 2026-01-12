'use client'

import { useEffect, useState } from 'react'
import FingerprintJS from '@fingerprintjs/fingerprintjs'
import { verifyVisitor } from '@/app/actions'
import { useRouter } from 'next/navigation'

export default function Gatekeeper({ children }: { children: React.ReactNode }) {
  const [isVerified, setIsVerified] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const checkFingerprint = async () => {
      // 1. Initialize FingerprintJS agent
      const fp = await FingerprintJS.load()

      // 2. Get the visitor identifier
      const { visitorId } = await fp.get()

      // 3. Verify with server
      const result = await verifyVisitor(visitorId)

      if (result === 'ALLOWED') {
        setIsVerified(true)
      } else {
        router.push('/expired')
      }
    }

    checkFingerprint()
  }, [router])

  if (!isVerified) {
    // Elegant loading state (Three Dots)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black">
        <div className="flex gap-2">
          {[...Array(3)].map((_, i) => (
            <div 
              key={i} 
              className="w-2 h-2 rounded-full bg-white/50 animate-pulse"
              style={{ animationDelay: `${i * 200}ms` }}
            />
          ))}
        </div>
      </div>
    )
  }

  return <>{children}</>
}

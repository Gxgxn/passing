'use client'

import Gatekeeper from '@/components/Gatekeeper';

export default function ExclusivePage() {
  return (
    <Gatekeeper>
      <main className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-zinc-950">
        {/* Subtle animated background */}
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-900 via-zinc-950 to-black" />
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-amber-500/5 to-transparent rounded-full blur-3xl" />
        </div>
        
        {/* Grain overlay */}
        <div className="absolute inset-0 opacity-20 mix-blend-overlay" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }} />

        {/* Content */}
        <div className="relative z-10 text-center px-6 max-w-2xl">
          {/* Time indicator */}
          <div className="mb-16 flex flex-col items-center">
            <div className="w-px h-24 bg-gradient-to-b from-transparent via-amber-500/50 to-amber-500/20 mb-8" />
            <div className="w-3 h-3 rounded-full border border-amber-500/50 animate-pulse" />
          </div>

          {/* Main message */}
          <div className="space-y-8 mb-16">
            <p className="text-2xl md:text-3xl text-white/90 font-light leading-relaxed">
              This page is borrowing time from you.
            </p>
            
            <p className="text-xl md:text-2xl text-zinc-400 font-light">
              When you leave, the debt is settled.
            </p>
            
            <p className="text-lg text-zinc-500 font-light">
              It won&apos;t open again.
            </p>
          </div>

          {/* Separator */}
          <div className="flex items-center justify-center gap-4 my-16">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-zinc-700" />
            <div className="w-2 h-2 rotate-45 border border-zinc-700" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-zinc-700" />
          </div>

          {/* Exclusive content area */}
          <div className="p-8 md:p-12 rounded-2xl border border-zinc-800/50 bg-zinc-900/30 backdrop-blur-sm">
            <p className="text-xs tracking-[0.3em] uppercase text-zinc-600 mb-6">
              The Moment
            </p>
            <p className="text-lg md:text-xl text-zinc-300 font-light italic leading-relaxed">
              &ldquo;You are experiencing something that will never happen again. 
              Not to you, not to anyone. This exact configuration of time, attention, 
              and presence exists only now.&rdquo;
            </p>
            <p className="mt-8 text-sm text-zinc-600">
              — The last thing this page will ever say
            </p>
          </div>

          {/* Warning footer */}
          <div className="mt-16 pt-8 border-t border-zinc-800/30">
            <p className="text-xs text-zinc-700 tracking-wider">
              CLOSING THIS TAB SETTLES THE DEBT • NO RETURNS • NO EXCEPTIONS
            </p>
          </div>
        </div>
      </main>
    </Gatekeeper>
  )
}

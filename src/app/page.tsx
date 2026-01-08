'use client'

import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-zinc-950">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-zinc-950 to-black" />
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-2xl">
        {/* Logo/Brand */}
        <div className="mb-12">
          <h1 className="text-6xl md:text-8xl  text-white/80 mb-2 scale-y-90 font-[outfit] tracking-wide ml-6">
            PASSING 
          <span className="text-white/80 position-absolute text-5xl">
            <span className="animate-pulse inline">.</span>
            <span className="animate-pulse inline" style={{ animationDelay: '200ms' }}>.</span>
            <span className="animate-pulse inline" style={{ animationDelay: '400ms' }}>.</span>
          </span>
          </h1>

          <div className="h-px w-48 mx-auto bg-gradient-to-r from-transparent via-white/50 to-transparent" />
        </div>

        {/* Tagline */}
        <p className="text-lg md:text-xl text-zinc-400 font-light leading-relaxed mb-16">
          Some moments exist only once.
          <br />
          <span className="text-zinc-500">This is one of them.</span>
        </p>

        {/* CTA Button */}
        <Link 
          href="/exclusive"
          className="group relative inline-flex items-center gap-3 px-8 py-4 border border-white/20 rounded-full text-white/80 hover:text-white hover:border-white/40 transition-all duration-500 backdrop-blur-sm"
        >
          <span className="text-sm tracking-[0.2em] uppercase font-light">
            Enter the moment
          </span>
          <svg 
            className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
          
          {/* Glow effect on hover */}
          <div className="absolute inset-0 rounded-full bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
        </Link>

        {/* Warning */}
        <p className="mt-16 text-xs text-zinc-600 tracking-wider uppercase">
          You will not be able to return
        </p>
      </div>

     
    </main>
  )
}

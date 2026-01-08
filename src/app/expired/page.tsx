'use client'

export default function ExpiredPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-zinc-950">
      {/* Dark static background */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-900 via-zinc-950 to-black" />
      
      {/* Faded/dead elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-zinc-500 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-xl">
        {/* Broken/ended indicator */}
        <div className="mb-12 flex flex-col items-center">
          <div className="w-px h-16 bg-zinc-800 mb-6" />
          <div className="w-4 h-4 rounded-full border-2 border-zinc-800 relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-3 h-px bg-zinc-700 rotate-45" />
            </div>
          </div>
        </div>

        {/* Main message */}
        <h1 className="text-4xl md:text-5xl font-extralight text-zinc-600 mb-8 tracking-wide">
          The debt is settled
        </h1>

        <p className="text-lg text-zinc-700 font-light leading-relaxed mb-4">
          Your moment has passed.
        </p>

        <p className="text-sm text-zinc-800 font-light">
          The page you&apos;re looking for existed once.
          <br />
          And that once wasn&apos;t now.
        </p>

        {/* Separator */}
        <div className="my-12 flex justify-center">
          <div className="h-px w-24 bg-zinc-800" />
        </div>

        {/* Footer note - no back button */}
        <p className="mt-16 text-xs text-zinc-800/50 tracking-widest uppercase">
          Time only moves forward
        </p>
      </div>
    </main>
  )
}

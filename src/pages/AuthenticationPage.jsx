import {LaserFlow} from "@/components/LaserFlow"
export default function FrontPage(){
  return(
    <>
      <div className="relative w-screen h-screen overflow-hidden bg-black">
        {/* Background LaserFlow */}
        <div className="w-1080px h-1080px position: relative">
          <LaserFlow
            color="#ffffff"
            wispDensity={1.3}
            flowSpeed={0.6}
            verticalSizing={2}
            horizontalSizing={1.5}
            fogIntensity={0.95}
            fogScale={0.3}
            wispSpeed={15}
            wispIntensity={5}
            flowStrength={0.25}
            decay={1.1}
            horizontalBeamOffset={0}
            verticalBeamOffset={-0.4}
          />       
        </div>
        {/* Foreground UI */}
        <div className="absolute inset-0 z-10 flex items-center justify-center">
            <div className="w-100 rounded-3xl border border-white/10 
                            bg-linear-to-b from-neutral-900/90 to-black/90
                            shadow-[0_0_40px_rgba(0,0,0,0.8)]
                            backdrop-blur-xl p-8
                            opacity-95">
              {/* Header */}
              <h1 className="text-3xl font-semibold text-white text-center mb-2">
                Welcome Back
              </h1>
              <p className="text-sm text-white/60 text-center mb-8">
                Log in to your semester brain
              </p>

              {/* Email */}
              <label className="text-sm text-white/80 mb-2 block">
                Email Address
              </label>
              <div className="flex items-center gap-3 mb-5
                              rounded-xl border border-white/10
                              bg-white/5 px-4 py-3">
                <span className="text-white/50">📧</span>
                <input
                  type="email"
                  placeholder="you@university.edu"
                  className="bg-transparent w-full text-white placeholder-white/40
                            focus:outline-none"
                />
              </div>

              {/* Password */}
              <label className="text-sm text-white/80 mb-2 block">
                Password
              </label>
              <div className="flex items-center gap-3 mb-6
                              rounded-xl border border-white/10
                              bg-white/5 px-4 py-3">
                <span className="text-white/50">🔒</span>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="bg-transparent w-full text-white placeholder-white/40
                            focus:outline-none"
                />
              </div>

              {/* Sign In */}
              <button
                className="w-full rounded-full bg-white text-black font-medium py-3
                          flex items-center justify-center gap-2
                          hover:bg-white/90 transition">
                Sign In →
              </button>

              {/* Divider */}
              <div className="flex items-center gap-3 my-6 text-white/30 text-xs">
                <div className="flex-1 h-px bg-white/10" />
                OR CONTINUE WITH
                <div className="flex-1 h-px bg-white/10" />
              </div>

              {/* Social buttons */}
              <div className="flex gap-4">
                <button
                  className="flex-1 rounded-full border border-white/10
                            bg-white/5 py-2 text-white
                            hover:bg-white/10 transition">
                  GitHub
                </button>
                <button
                  className="flex-1 rounded-full border border-white/10
                            bg-white/5 py-2 text-white
                            hover:bg-white/10 transition">
                  Google
                </button>
              </div>

              {/* Footer */}
              <p className="text-center text-sm text-white/50 mt-6">
                Don’t have an account?{" "}
                <span className="text-white font-medium cursor-pointer">
                  Sign Up
                </span>
              </p>
            </div>
          </div>
      </div>
    </>
  )
}
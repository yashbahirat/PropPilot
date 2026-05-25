"use client";

import { m, LazyMotion, domAnimation, useMotionValue, useSpring } from "framer-motion";
import { PieChart, ArrowRight, CheckCircle2, LineChart } from "lucide-react";
import { useState, useEffect } from "react";

import { submitWaitlistEmail } from "@/actions/waitlist";

export default function ComingSoonPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Mouse position for interactive background glow
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 40, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 20 });

  useEffect(() => {
    setMounted(true);
    document.title = "PropPilot — Coming Soon";
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    setError("");

    try {
      const result = await submitWaitlistEmail(email);
      if (result.success) {
        setSubmitted(true);
      } else {
        setError(result.error || "Failed to join waitlist");
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  // Prevent hydration mismatch with mouse tracking
  if (!mounted) return null;

  return (
    <LazyMotion features={domAnimation}>
      <div className="min-h-screen bg-[#08080F] text-slate-200 font-sans selection:bg-cyan-500/30 overflow-hidden flex flex-col relative items-center justify-center">
        
        {/* Interactive Mesh Gradient that follows mouse */}
        <m.div 
          className="pointer-events-none fixed top-0 left-0 w-[600px] h-[600px] md:w-[800px] md:h-[800px] -translate-x-1/2 -translate-y-1/2 z-0 opacity-30 mix-blend-screen"
          style={{ x: springX, y: springY }}
        >
          <m.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="w-full h-full relative"
          >
            <div className="absolute top-[10%] left-[10%] w-[300px] h-[300px] md:w-[400px] md:h-[400px] bg-cyan-500 rounded-full blur-[80px] md:blur-[120px]" />
            <div className="absolute top-[20%] right-[10%] w-[250px] h-[250px] md:w-[350px] md:h-[350px] bg-emerald-500 rounded-full blur-[80px] md:blur-[120px]" />
            <div className="absolute bottom-[10%] left-[20%] w-[350px] h-[350px] md:w-[450px] md:h-[450px] bg-teal-600 rounded-full blur-[100px] md:blur-[140px]" />
          </m.div>
        </m.div>

        {/* Ambient static glows */}
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-emerald-500/10 blur-[150px] z-0 pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] rounded-full bg-cyan-600/10 blur-[150px] z-0 pointer-events-none" />

        {/* Grid Pattern Background */}
        <div 
          className="absolute inset-0 z-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
            maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)',
            WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)',
          }}
        />

        {/* Floating Abstract Elements to make it feel alive */}
        <m.div 
          animate={{ y: [-10, 10, -10], rotate: [0, 5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute flex top-[5%] sm:top-[10%] md:top-[20%] left-[2%] sm:left-[5%] md:left-[10%] xl:left-[15%] w-36 md:w-40 scale-75 sm:scale-90 md:scale-100 origin-top-left bg-[#0E0E1A]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-4 flex-col gap-3 shadow-2xl z-10 opacity-70 md:opacity-100 pointer-events-none"
        >
           <div className="flex items-center gap-2">
             <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center">
               <LineChart className="w-4 h-4 text-cyan-400" />
             </div>
             <div className="text-[10px] text-slate-400 font-mono">MAX ALLOC.</div>
           </div>
           
           <div>
             <div className="text-lg text-white font-bold tracking-tight">$2.0M+</div>
           </div>

           <div className="w-full h-1.5 rounded-full bg-white/5 overflow-hidden">
             <m.div 
                className="h-full bg-gradient-to-r from-cyan-400 to-[#00D4AA]"
                initial={{ width: "30%" }}
                animate={{ width: ["30%", "85%", "30%"] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
             />
           </div>
        </m.div>

        <m.div 
          animate={{ y: [10, -10, 10], rotate: [0, -5, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute flex bottom-[5%] sm:bottom-[10%] md:bottom-[20%] right-[2%] sm:right-[5%] md:right-[10%] xl:right-[15%] w-40 md:w-48 h-20 md:h-24 scale-75 sm:scale-90 md:scale-100 origin-bottom-right bg-[#0E0E1A]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-3 md:p-4 flex-col shadow-2xl z-10 justify-center opacity-70 md:opacity-100 pointer-events-none"
        >
           <div className="flex items-center gap-3 mb-2">
             <div className="w-8 h-8 rounded-full bg-[#00D4AA]/20 flex items-center justify-center">
               <PieChart className="w-4 h-4 text-[#00D4AA]" />
             </div>
             <div>
               <div className="text-[10px] text-slate-400 font-mono">PROFIT SPLIT</div>
               <div className="text-sm text-[#00D4AA] font-bold">Up to 90%</div>
             </div>
           </div>
        </m.div>


        {/* Main Content (Centered Layout) */}
        <main className="relative z-20 flex flex-col items-center justify-center px-8 sm:px-12 w-full max-w-4xl text-center">
          
          <m.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center"
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-4">
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-[#00D4AA] to-emerald-400 pb-2">
                PropPilot
              </span>
              <span className="text-white">is Coming Soon.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed mb-10">
              The future of data-driven prop discovery. Compare drawdown rules, hidden fees, and payout proofs across top-tier proprietary trading firms.
            </p>
          </m.div>

          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="w-full max-w-xl mx-auto"
          >
            {!submitted ? (
              <form onSubmit={handleSubmit} className="relative w-full flex flex-col gap-2">
                <div className="relative w-full flex flex-col sm:flex-row gap-3">
                  <div className="w-full sm:flex-1 h-14 relative group rounded-xl p-[1px] overflow-hidden shadow-xl shrink-0">
                    <div className="absolute inset-0 bg-white/10 group-focus-within:bg-gradient-to-r group-focus-within:from-cyan-400 group-focus-within:to-[#00D4AA] transition-colors duration-300" />
                    <input
                      type="email"
                      required
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={isLoading}
                      className="relative w-full h-full px-5 bg-[#0E0E1A]/90 backdrop-blur-xl text-white placeholder:text-slate-400 focus:outline-none focus:bg-[#0E0E1A] text-base rounded-[11px] transition-colors disabled:opacity-50"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full sm:w-auto h-14 px-8 rounded-xl bg-gradient-to-r from-cyan-400 to-[#00D4AA] hover:from-cyan-300 hover:to-cyan-400 text-[#0E0E1A] font-bold text-base tracking-wide transition-all duration-300 hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 whitespace-nowrap shrink-0 disabled:opacity-80 disabled:hover:scale-100 disabled:cursor-not-allowed"
                  >
                    {isLoading ? "Joining..." : "Join Waitlist"}
                    {!isLoading && <ArrowRight className="w-5 h-5" />}
                  </button>
                </div>
                {error && <m.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-red-400 text-sm text-left pl-2">{error}</m.p>}
              </form>
            ) : (
              <m.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-6 rounded-2xl bg-transparent border border-white/20 flex items-center justify-center gap-4 backdrop-blur-xl shadow-2xl relative overflow-hidden w-full"
              >
                <div className="w-12 h-12 rounded-full bg-transparent border border-[#00D4AA]/30 flex items-center justify-center flex-shrink-0 relative z-10">
                  <CheckCircle2 className="w-6 h-6 text-[#00D4AA]" />
                </div>
                <div className="text-left relative z-10">
                  <h3 className="text-white font-semibold text-lg">Early Access Confirmed</h3>
                  <p className="text-slate-400 text-sm">We'll notify you the moment the platform goes live.</p>
                </div>
              </m.div>
            )}
          </m.div>

        </main>
      </div>
    </LazyMotion>
  );
}

"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { RuleDifficultyScore } from "./RuleDifficultyScore"
import { CopyCodeButton } from "./CopyCodeButton"
import { Firm, FirmOffer } from "@prisma/client"
import { ExternalLink, ShieldCheck } from "lucide-react"
import { m, LazyMotion, domAnimation, Variants } from "framer-motion"

type FirmWithOffers = Firm & {
  offers: FirmOffer[]
}

interface FirmHeroProps {
  firm: FirmWithOffers
}

export function FirmHero({ firm }: FirmHeroProps) {
  const featuredOffer = firm.offers.find((o) => o.isActive && o.isExclusive) || firm.offers.find((o) => o.isActive)

  const score = firm.ruleDifficultyScore || 0
  const breakdown = {
    drawdownType: firm.drawdownType 
      ? `${firm.drawdownType.replace(/_/g, ' ')} (${firm.maxDrawdown}%)`
      : "Not specified",
    consistencyRule: firm.consistencyRule ? "Yes" : "No",
    profitTarget: firm.profitTarget ? `${firm.profitTarget}%` : "Not specified",
    restrictions: [
      firm.newsTrading ? "News Trading Allowed" : "No News Trading",
      firm.weekendHolding ? "Weekend Holding Allowed" : "No Weekend Holding"
    ].join(", ")
  }

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      }
    }
  }

  const textVariants: Variants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 200, damping: 20 } }
  }

  const logoVariants: Variants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { type: "spring", stiffness: 150, damping: 15 } }
  }

  // Use a stunning, dark, premium abstract mesh from Unsplash as the base backdrop
  const bgImage = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop"

  return (
    <LazyMotion features={domAnimation}>
      <section className="relative w-full min-h-[70vh] md:min-h-[600px] flex items-end pb-12 overflow-hidden bg-[#000000]">
        
        {/* Full-Bleed Background Image with Subtle Slow Pan */}
        <m.div 
          className="absolute inset-0 z-0"
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.4 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <Image
            src={bgImage}
            alt="Premium abstract background"
            fill
            className="object-cover object-center"
            priority
          />
        </m.div>

        {/* Netflix-style heavy bottom gradient fading to true black */}
        <div className="absolute inset-0 z-0 bg-gradient-to-t from-[#08080F] via-[#08080F]/80 to-transparent pointer-events-none" />
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#08080F] via-transparent to-transparent pointer-events-none" />
        
        {/* Content Container */}
        <div className="container mx-auto px-4 relative z-10 w-full pt-32">
          <m.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col md:flex-row gap-10 items-start md:items-end justify-between w-full"
          >
            
            {/* Left side: Huge Typography & Identity */}
            <div className="flex flex-col gap-6 max-w-3xl">
              
              {/* Firm Logo & Verified Badge Row */}
              <div className="flex items-center gap-4">
                <m.div variants={logoVariants} className="relative group">
                  <div className="absolute -inset-2 bg-primary/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <div className="relative w-20 h-20 md:w-24 md:h-24 bg-black/40 backdrop-blur-md rounded-2xl border border-white/10 flex items-center justify-center p-3 shadow-2xl overflow-hidden">
                    {firm.logoUrl ? (
                      <Image
                        src={firm.logoUrl}
                        alt={`${firm.name} logo`}
                        width={96}
                        height={96}
                        className="w-full h-full object-contain filter drop-shadow-lg"
                      />
                    ) : (
                      <span className="text-3xl font-black text-white tracking-tighter">
                        {firm.name.charAt(0)}
                      </span>
                    )}
                  </div>
                </m.div>

                {firm.isVerified && (
                  <m.div variants={textVariants} className="flex flex-col justify-center">
                    <Badge className="bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 backdrop-blur-md px-3 py-1 gap-1.5 shadow-[0_0_15px_rgba(var(--primary),0.15)] transition-all">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span className="font-semibold tracking-wide uppercase text-[10px]">Verified Partner</span>
                    </Badge>
                  </m.div>
                )}
              </div>

              {/* Massive Bold Typography (Apple style) */}
              <m.div variants={textVariants} className="space-y-2">
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter leading-[0.9] drop-shadow-2xl">
                  {firm.name}
                </h1>
                <p className="text-lg md:text-2xl text-white/70 font-medium tracking-tight max-w-2xl leading-snug">
                  {firm.description || "Empowering traders with institutional-grade capital and industry-leading payout speeds."}
                </p>
              </m.div>

              {/* Offer Highlight */}
              {featuredOffer && (
                <m.div variants={textVariants} className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-full pl-2 pr-4 py-1.5 w-fit shadow-xl mt-2">
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-accent/20">
                    <span className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse-teal shadow-[0_0_10px_rgba(var(--accent),0.8)]" />
                  </div>
                  <span className="text-sm font-semibold text-white tracking-wide">
                    Exclusive Offer: <span className="text-accent">{featuredOffer.discountPercent}% OFF</span>
                  </span>
                </m.div>
              )}
            </div>

            {/* Right side: Score & CTAs encased in a glassmorphism panel */}
            <m.div 
              variants={textVariants} 
              className="flex flex-col gap-6 w-full md:w-[380px] shrink-0 bg-[#0A0A12]/60 backdrop-blur-2xl border border-white/5 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden"
            >
              {/* Subtle inner highlight for the glass panel */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              
              <div className="flex flex-col gap-2">
                <h3 className="text-sm font-semibold text-white/50 uppercase tracking-widest">Platform Rating</h3>
                <RuleDifficultyScore score={score} breakdown={breakdown} />
              </div>
              
              <div className="w-full h-px bg-white/5" />

              <div className="flex flex-col gap-3">
                <Button asChild size="lg" className="w-full h-14 rounded-xl bg-white text-black hover:bg-white/90 text-base font-bold shadow-[0_0_30px_rgba(255,255,255,0.15)] hover:shadow-[0_0_40px_rgba(255,255,255,0.25)] transition-all duration-300">
                  <Link href={`/go/${firm.slug}`} target="_blank" rel="noopener noreferrer">
                    Get Funded Now
                    <ExternalLink className="h-4 w-4 ml-2 opacity-70" />
                  </Link>
                </Button>
                
                {featuredOffer && featuredOffer.code && (
                  <CopyCodeButton code={featuredOffer.code} className="w-full h-12 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium backdrop-blur-md" />
                )}
              </div>
              
              <p className="text-[10px] text-white/40 text-center uppercase tracking-widest font-medium mt-2">
                PropPilot receives a commission. This keeps our reviews unbiased.
              </p>
            </m.div>

          </m.div>
        </div>
      </section>
    </LazyMotion>
  )
}

"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { RuleDifficultyScore } from "./RuleDifficultyScore"
import { CopyCodeButton } from "./CopyCodeButton"
import { Firm, FirmOffer } from "@prisma/client"
import { ExternalLink, Copy } from "lucide-react"
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
        staggerChildren: 0.1,
        delayChildren: 0.1,
      }
    }
  }

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 24 } }
  }

  return (
    <LazyMotion features={domAnimation}>
      <section className="relative w-full border-b border-prop-border bg-[#08080F] pt-16 pb-12 overflow-hidden">
        {/* Dynamic Background Effects */}
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[150%] bg-primary/10 blur-[150px] rounded-full mix-blend-screen pointer-events-none opacity-60 animate-pulse-slow" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[40%] h-[120%] bg-accent/10 blur-[150px] rounded-full mix-blend-screen pointer-events-none opacity-40 animate-pulse-slow delay-1000" />
        
        {/* Grid overlay */}
        <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-10 pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
          <m.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col md:flex-row gap-8 items-start md:items-center justify-between bg-surface/40 backdrop-blur-xl border border-prop-border-subtle p-6 md:p-8 rounded-2xl shadow-2xl"
          >
            {/* Left side: Logo, Name, Score */}
            <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
              {/* Logo with Glow */}
              <m.div variants={itemVariants} className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
                <div className="relative w-28 h-28 md:w-36 md:h-36 shrink-0 bg-surface rounded-xl border border-prop-border flex items-center justify-center p-4 shadow-card">
                  {firm.logoUrl ? (
                    <Image
                      src={firm.logoUrl}
                      alt={`${firm.name} logo`}
                      width={128}
                      height={128}
                      className="w-full h-full object-contain drop-shadow-md"
                    />
                  ) : (
                    <div className="text-3xl font-bold text-muted-foreground">
                      {firm.name.charAt(0)}
                    </div>
                  )}
                </div>
              </m.div>

              {/* Firm Details */}
              <div className="flex flex-col gap-4">
                <m.div variants={itemVariants} className="flex items-center gap-3">
                  <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-foreground to-foreground/80 tracking-tight">
                    {firm.name}
                  </h1>
                  {firm.isVerified && (
                    <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 shadow-[0_0_10px_rgba(var(--primary),0.2)]">
                      Verified
                    </Badge>
                  )}
                </m.div>
                
                {featuredOffer && (
                  <m.div variants={itemVariants} className="text-sm font-semibold text-muted-foreground flex items-center gap-2 bg-surface/50 w-fit px-3 py-1.5 rounded-full border border-prop-border-subtle">
                    <span className="inline-block w-2.5 h-2.5 rounded-full bg-accent animate-pulse-teal shadow-[0_0_8px_rgba(var(--accent),0.6)]" />
                    Featured Offer: <span className="text-foreground tracking-wide">{featuredOffer.discountPercent}% OFF</span>
                  </m.div>
                )}

                {/* Score Component */}
                <m.div variants={itemVariants} className="mt-2 w-full max-w-[320px]">
                  <RuleDifficultyScore score={score} breakdown={breakdown} />
                </m.div>
              </div>
            </div>

            {/* Right side: CTAs */}
            <div className="flex flex-col items-start md:items-end gap-5 w-full md:w-auto mt-6 md:mt-0">
              <m.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <Button asChild size="lg" className="w-full sm:w-auto gap-2 bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_20px_rgba(var(--primary),0.3)] hover:shadow-[0_0_30px_rgba(var(--primary),0.5)] transition-all duration-300 font-bold px-8">
                  <Link href={`/go/${firm.slug}`} target="_blank" rel="noopener noreferrer">
                    Visit Site
                    <ExternalLink className="h-4 w-4" />
                  </Link>
                </Button>
                
                {featuredOffer && featuredOffer.code && (
                  <CopyCodeButton code={featuredOffer.code} className="w-full sm:w-auto px-8" />
                )}
              </m.div>
              
              <m.div variants={itemVariants}>
                <p className="text-[11px] text-muted-foreground/70 max-w-[280px] text-left md:text-right leading-relaxed uppercase tracking-wider font-medium">
                  PropPilot may receive a commission on purchases. This does not affect our reviews.
                </p>
              </m.div>
            </div>
          </m.div>
        </div>
      </section>
    </LazyMotion>
  )
}

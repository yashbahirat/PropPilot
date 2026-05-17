import React from "react"
import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { RuleDifficultyScore } from "./RuleDifficultyScore"
import { Firm, FirmOffer } from "@prisma/client"
import { ExternalLink, Copy } from "lucide-react"

type FirmWithOffers = Firm & {
  offers: FirmOffer[]
}

interface FirmHeroProps {
  firm: FirmWithOffers
}

export function FirmHero({ firm }: FirmHeroProps) {
  // Find the best or featured offer
  const featuredOffer = firm.offers.find((o) => o.isActive && o.isExclusive) || firm.offers.find((o) => o.isActive)

  // Construct score breakdown from firm data
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

  return (
    <section className="relative w-full border-b border-prop-border bg-gradient-to-b from-[#08080F] to-[#1E1E30] pt-12 pb-8 overflow-hidden">
      {/* Subtle ambient glow behind the hero */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row gap-8 items-start md:items-center justify-between">
          
          {/* Left side: Logo, Name, Score */}
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
            {/* Logo */}
            <div className="w-24 h-24 md:w-32 md:h-32 shrink-0 bg-surface rounded-xl border border-prop-border flex items-center justify-center p-4 shadow-card">
              {firm.logoUrl ? (
                <Image
                  src={firm.logoUrl}
                  alt={`${firm.name} logo`}
                  width={128}
                  height={128}
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="text-2xl font-bold text-muted-foreground">
                  {firm.name.charAt(0)}
                </div>
              )}
            </div>

            {/* Firm Details */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                  {firm.name}
                </h1>
                {firm.isVerified && (
                  <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                    Verified
                  </Badge>
                )}
              </div>
              
              {featuredOffer && (
                <div className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-accent animate-pulse-teal" />
                  Featured Offer: <span className="text-foreground">{featuredOffer.discountPercent}% OFF</span>
                </div>
              )}

              {/* Score Component */}
              <div className="mt-2">
                <RuleDifficultyScore score={score} breakdown={breakdown} />
              </div>
            </div>
          </div>

          {/* Right side: CTAs */}
          <div className="flex flex-col items-start md:items-end gap-4 w-full md:w-auto mt-4 md:mt-0">
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <Button asChild size="lg" className="w-full sm:w-auto gap-2 bg-primary hover:bg-primary/90 text-primary-foreground shadow-card-hover font-semibold">
                <Link href={`/go/${firm.slug}`} target="_blank" rel="noopener noreferrer">
                  Visit Site
                  <ExternalLink className="h-4 w-4" />
                </Link>
              </Button>
              
              {featuredOffer && (
                <Button variant="outline" size="lg" className="w-full sm:w-auto gap-2 border-prop-border-subtle bg-surface hover:bg-surface-2 hover:text-foreground">
                  <Copy className="h-4 w-4 text-muted-foreground" />
                  Copy Code
                </Button>
              )}
            </div>
            
            <p className="text-xs text-muted-foreground/80 max-w-[280px] text-left md:text-right leading-relaxed">
              PropPilot may receive a commission if you make a purchase through our links. This does not affect your price or our review process.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

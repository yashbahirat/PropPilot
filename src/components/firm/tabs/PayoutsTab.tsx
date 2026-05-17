"use client"

import React from "react"
import { Firm } from "@prisma/client"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CreditCard, Wallet, Clock, CheckCircle2 } from "lucide-react"

interface PayoutsTabProps {
  firm: Firm
}

export function PayoutsTab({ firm }: PayoutsTabProps) {
  // We're using placeholder/fallback values for properties that don't exist directly on the model
  // according to the current schema. In a full implementation, these would be added to the Prisma schema.
  
  const profitSplit = firm.profitTarget ? `Up to 90%` : "80%" // Fallback logic
  const payoutFrequency = "Bi-weekly" // Fallback
  const firstPayout = "14 days after first trade" // Fallback
  const withdrawalMethods = ["Crypto (BTC, ETH, USDT)", "Deel", "Bank Wire"] // Fallback

  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      {/* Hero-style Payout Stat */}
      <Card className="bg-gradient-to-br from-primary/10 to-transparent border-primary/20 shadow-card">
        <CardContent className="p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-semibold text-primary uppercase tracking-wider">Maximum Profit Split</h3>
            <div className="text-4xl md:text-5xl font-bold text-foreground">
              {profitSplit}
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              One of the highest payouts in the industry
            </p>
          </div>
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
            <Wallet className="w-8 h-8 text-primary" />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Timing Card */}
        <Card className="bg-[#1E1E30] border-prop-border shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-surface rounded-lg">
                <Clock className="w-5 h-5 text-accent" />
              </div>
              <h3 className="text-lg font-bold text-foreground">Payout Timing</h3>
            </div>
            
            <div className="space-y-5">
              <div>
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-1">First Payout</span>
                <span className="text-base font-medium text-foreground">{firstPayout}</span>
              </div>
              <div>
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-1">Subsequent Payouts</span>
                <span className="text-base font-medium text-foreground">{payoutFrequency}</span>
              </div>
              <div>
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-1">Processing Time</span>
                <span className="text-base font-medium text-foreground">24-48 hours</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Methods Card */}
        <Card className="bg-[#1E1E30] border-prop-border shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-surface rounded-lg">
                <CreditCard className="w-5 h-5 text-accent" />
              </div>
              <h3 className="text-lg font-bold text-foreground">Withdrawal Methods</h3>
            </div>
            
            <ul className="space-y-3">
              {withdrawalMethods.map((method, i) => (
                <li key={i} className="flex items-center gap-3 text-sm font-medium text-foreground p-3 rounded-lg bg-surface border border-prop-border-subtle">
                  <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
                  {method}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

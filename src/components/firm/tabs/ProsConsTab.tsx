"use client"

import React from "react"
import { Firm } from "@prisma/client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, XCircle } from "lucide-react"

interface ProsConsTabProps {
  firm: Firm
}

export function ProsConsTab({ firm }: ProsConsTabProps) {
  // Derive pros and cons from the firm's data since we don't have explicit arrays in the schema
  const pros: string[] = []
  const cons: string[] = []

  if (firm.newsTrading) pros.push("News trading is permitted")
  if (firm.weekendHolding) pros.push("Weekend holding is allowed")
  if (firm.eaAllowed) pros.push("Expert Advisors (EAs) are supported")
  if (firm.scalingPlan) pros.push("Account scaling plan available")
  if (firm.profitSplit && firm.profitSplit >= 80) pros.push(`High profit split up to ${firm.profitSplit}%`)
  if (firm.payoutSpeed) pros.push(`${firm.payoutSpeed} payouts`)

  if (firm.consistencyRule) cons.push(firm.consistencyRuleNote || "Strict consistency rule applies")
  if (!firm.weekendHolding) cons.push("Weekend holding is not allowed")
  if (firm.minTradingDays && firm.minTradingDays > 0) cons.push(`Minimum of ${firm.minTradingDays} trading days required`)
  if (firm.dailyLossLimit && firm.dailyLossLimit < 5) cons.push(`Strict daily loss limit of ${firm.dailyLossLimit}%`)
  
  const hasPros = pros.length > 0
  const hasCons = cons.length > 0
  const isEmpty = !hasPros && !hasCons

  if (isEmpty) {
    return (
      <Card className="bg-[#1E1E30] border-prop-border shadow-card animate-fade-in text-center py-12">
        <CardContent className="flex flex-col items-center gap-2 text-muted-foreground">
          <p className="text-base">No pros/cons added yet.</p>
          <p className="text-sm">Check back later for detailed analysis.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full animate-fade-in">
      {/* Pros Column */}
      <Card className="bg-[#1E1E30] border-prop-border shadow-card relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full bg-accent" />
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-bold text-foreground flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-accent" />
            Pros
          </CardTitle>
        </CardHeader>
        <CardContent>
          {hasPros ? (
            <ul className="space-y-3">
              {pros.map((pro, i) => (
                <li key={i} className="flex items-start gap-3 text-muted-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                  <span className="text-base leading-relaxed">{pro}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground italic">No pros identified.</p>
          )}
        </CardContent>
      </Card>

      {/* Cons Column */}
      <Card className="bg-[#1E1E30] border-prop-border shadow-card relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full bg-destructive" />
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-bold text-foreground flex items-center gap-2">
            <XCircle className="w-5 h-5 text-destructive" />
            Cons
          </CardTitle>
        </CardHeader>
        <CardContent>
          {hasCons ? (
            <ul className="space-y-3">
              {cons.map((con, i) => (
                <li key={i} className="flex items-start gap-3 text-muted-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-destructive mt-2 shrink-0" />
                  <span className="text-base leading-relaxed">{con}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground italic">No cons identified.</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

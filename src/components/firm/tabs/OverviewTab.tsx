"use client"

import React from "react"
import { Firm } from "@prisma/client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface OverviewTabProps {
  firm: Firm
}

export function OverviewTab({ firm }: OverviewTabProps) {
  return (
    <div className="flex flex-col gap-6 w-full animate-fade-in">
      {/* Description / Overview */}
      <Card className="bg-[#1E1E30] border-prop-border shadow-card">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-foreground">Firm Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-muted-foreground leading-relaxed text-base">
            {firm.description ? (
              <p>{firm.description}</p>
            ) : (
              <p className="italic">No description available for this firm yet.</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-[#1E1E30] border-prop-border shadow-card">
          <CardContent className="pt-6">
            <div className="flex flex-col gap-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Account Sizes</span>
              <span className="text-lg font-bold text-foreground">
                {firm.minAccountSize && firm.maxAccountSize 
                  ? `$${(firm.minAccountSize / 1000)}k - $${(firm.maxAccountSize / 1000)}k` 
                  : "Varied"}
              </span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-[#1E1E30] border-prop-border shadow-card">
          <CardContent className="pt-6">
            <div className="flex flex-col gap-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Profit Split</span>
              <span className="text-lg font-bold text-foreground">
                {firm.profitSplit ? `Up to ${firm.profitSplit}%` : "Standard"}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#1E1E30] border-prop-border shadow-card">
          <CardContent className="pt-6">
            <div className="flex flex-col gap-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Evaluation</span>
              <span className="text-lg font-bold text-foreground">
                {firm.evaluationType ? firm.evaluationType.replace(/_/g, " ") : "Challenge"}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#1E1E30] border-prop-border shadow-card">
          <CardContent className="pt-6">
            <div className="flex flex-col gap-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Payouts</span>
              <span className="text-lg font-bold text-foreground">
                {firm.payoutSpeed || "Bi-weekly"}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Our Verdict */}
      <Card className="bg-[#1E1E30] border-prop-border shadow-card relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
        <CardHeader>
          <CardTitle className="text-xl font-bold text-foreground">Our Verdict</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-muted-foreground leading-relaxed text-base">
            <p>
              {firm.name} offers a solid balance of rules and scalability. 
              {firm.profitSplit && firm.profitSplit >= 90 ? " Their generous profit split is an industry standout. " : " "}
              {firm.newsTrading ? "The allowance of news trading makes them a versatile choice for day traders." : "They maintain strict trading parameters suitable for disciplined traders."}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

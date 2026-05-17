"use client"

import React from "react"
import { Firm } from "@prisma/client"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, X, AlertTriangle } from "lucide-react"

interface RulesTabProps {
  firm: Firm
}

export function RulesTab({ firm }: RulesTabProps) {
  const rules = [
    { label: "Drawdown Type", value: firm.drawdownType ? firm.drawdownType.replace(/_/g, " ") : "Not specified" },
    { label: "Max Drawdown", value: firm.maxDrawdown ? `${firm.maxDrawdown}%` : "Not specified" },
    { label: "Daily Loss Limit", value: firm.dailyLossLimit ? `${firm.dailyLossLimit}%` : "Not specified" },
    { label: "Minimum Trading Days", value: firm.minTradingDays ? `${firm.minTradingDays} days` : "None" },
  ]

  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Key Rules Card */}
        <Card className="bg-[#1E1E30] border-prop-border shadow-card">
          <CardContent className="p-6">
            <h3 className="text-lg font-bold text-foreground mb-6">Trading Parameters</h3>
            <div className="space-y-4">
              {rules.map((rule, index) => (
                <div key={index} className="flex justify-between items-center border-b border-prop-border-subtle pb-3 last:border-0 last:pb-0">
                  <span className="text-sm font-semibold text-muted-foreground">{rule.label}</span>
                  <span className="text-sm font-medium text-foreground">{rule.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Policy Flags Card */}
        <Card className="bg-[#1E1E30] border-prop-border shadow-card">
          <CardContent className="p-6">
            <h3 className="text-lg font-bold text-foreground mb-6">Trading Policies</h3>
            <div className="space-y-4">
              <PolicyRow label="News Trading" isAllowed={firm.newsTrading} />
              <PolicyRow label="Weekend Holding" isAllowed={firm.weekendHolding} />
              <PolicyRow label="Expert Advisors (EAs)" isAllowed={firm.eaAllowed} />
              <PolicyRow label="Scaling Plan" isAllowed={firm.scalingPlan} />
              
              <div className="flex justify-between items-center border-b border-prop-border-subtle pb-3 last:border-0 last:pb-0">
                <span className="text-sm font-semibold text-muted-foreground">Consistency Rule</span>
                {firm.consistencyRule ? (
                  <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-500/20 gap-1">
                    <AlertTriangle className="w-3 h-3" />
                    Applies
                  </Badge>
                ) : (
                  <span className="text-sm font-medium flex items-center gap-2 text-green-400">
                    <Check className="w-4 h-4" /> None
                  </span>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {firm.consistencyRuleNote && (
        <Card className="bg-amber-500/5 border-amber-500/20 shadow-card">
          <CardContent className="p-4 flex gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-bold text-amber-500 mb-1">Consistency Rule Note</h4>
              <p className="text-sm text-muted-foreground">{firm.consistencyRuleNote}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

function PolicyRow({ label, isAllowed }: { label: string; isAllowed: boolean }) {
  return (
    <div className="flex justify-between items-center border-b border-prop-border-subtle pb-3 last:border-0 last:pb-0">
      <span className="text-sm font-semibold text-muted-foreground">{label}</span>
      {isAllowed ? (
        <span className="text-sm font-medium flex items-center gap-2 text-green-400">
          <Check className="w-4 h-4" /> Allowed
        </span>
      ) : (
        <span className="text-sm font-medium flex items-center gap-2 text-destructive">
          <X className="w-4 h-4" /> Not Allowed
        </span>
      )}
    </div>
  )
}

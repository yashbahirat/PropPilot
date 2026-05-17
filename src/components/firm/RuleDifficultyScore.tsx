"use client"

import * as React from "react"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { Progress } from "@/components/ui/progress"

interface RuleDifficultyScoreProps {
  score: number
  breakdown: {
    drawdownType: string
    consistencyRule: string
    profitTarget: string
    restrictions: string
  }
}

export function RuleDifficultyScore({ score, breakdown }: RuleDifficultyScoreProps) {
  return (
    <div className="flex flex-col gap-2 w-full max-w-[240px]">
      <div className="flex justify-between items-center text-sm font-semibold text-foreground">
        <span>Rule Difficulty</span>
        <span className="text-primary">{score}/100</span>
      </div>
      
      <HoverCard openDelay={200} closeDelay={100}>
        <HoverCardTrigger asChild>
          <div className="cursor-help py-1">
            <Progress value={score} className="h-2.5 w-full bg-secondary" />
          </div>
        </HoverCardTrigger>
        <HoverCardContent className="w-80 border-prop-border-subtle bg-surface-2" align="start" sideOffset={12}>
          <div className="flex flex-col gap-4">
            <div className="space-y-1.5">
              <h4 className="text-sm font-semibold text-foreground">Score Breakdown</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                A higher score indicates more flexible and trader-friendly rules.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-sm">
              <div className="flex flex-col gap-1">
                <span className="text-muted-foreground text-xs font-medium uppercase tracking-wider">Drawdown</span>
                <span className="font-semibold text-foreground">{breakdown.drawdownType}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-muted-foreground text-xs font-medium uppercase tracking-wider">Consistency</span>
                <span className="font-semibold text-foreground">{breakdown.consistencyRule}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-muted-foreground text-xs font-medium uppercase tracking-wider">Profit Target</span>
                <span className="font-semibold text-foreground">{breakdown.profitTarget}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-muted-foreground text-xs font-medium uppercase tracking-wider">Restrictions</span>
                <span className="font-semibold text-foreground">{breakdown.restrictions}</span>
              </div>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  )
}
// Note: Uses HoverCard instead of Tooltip for richer content layout

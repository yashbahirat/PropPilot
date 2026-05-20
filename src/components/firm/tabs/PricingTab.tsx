"use client"

import React from "react"
import { Firm, FirmOffer } from "@prisma/client"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CopyCodeButton } from "../CopyCodeButton"
import { Tag, TrendingDown, Info } from "lucide-react"

type FirmWithOffers = Firm & {
  offers: FirmOffer[]
}

interface PricingTabProps {
  firm: FirmWithOffers
}

export function PricingTab({ firm }: PricingTabProps) {
  // We'll mock the evaluation sizes/fees for the UI since they aren't fully
  // modeled in the DB yet. In production, this would map over an `AccountSize` relation.
  const accountSizes = [
    { size: "$10,000", fee: "$99" },
    { size: "$25,000", fee: "$199" },
    { size: "$50,000", fee: "$299" },
    { size: "$100,000", fee: "$499" },
    { size: "$200,000", fee: "$999" },
  ]

  const activeOffers = firm.offers.filter(o => o.isActive)
  const bestOffer = activeOffers.sort((a, b) => (b.discountPercent || 0) - (a.discountPercent || 0))[0]

  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      {/* Offers Section */}
      <div className="flex flex-col gap-4">
        <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
          <Tag className="w-5 h-5 text-primary" /> 
          Available Discounts
        </h3>
        
        {activeOffers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {activeOffers.map((offer) => (
              <Card key={offer.id} className={`bg-[#1E1E30] border-prop-border shadow-card relative overflow-hidden ${offer.isExclusive ? 'border-primary/50' : ''}`}>
                {offer.isExclusive && (
                  <div className="absolute top-0 right-0 bg-primary/20 text-primary text-[10px] font-bold px-2 py-1 rounded-bl-lg uppercase tracking-wider">
                    Exclusive
                  </div>
                )}
                <CardContent className="p-5 flex flex-col h-full justify-between gap-4">
                  <div>
                    <div className="text-2xl font-bold text-foreground mb-1">{offer.discountPercent}% OFF</div>
                    <p className="text-sm text-muted-foreground">{offer.description}</p>
                  </div>
                  
                  {offer.code ? (
                    <CopyCodeButton code={offer.code} firmId={firm.id} offerId={offer.id} className="w-full" />
                  ) : (
                    <Badge variant="outline" className="justify-center py-2 text-muted-foreground">
                      Link Auto-applies
                    </Badge>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="bg-surface border-prop-border-subtle border-dashed">
            <CardContent className="p-8 text-center text-muted-foreground">
              No active discounts available for this firm right now.
            </CardContent>
          </Card>
        )}
      </div>

      {/* Pricing Grid */}
      <div className="flex flex-col gap-4 mt-4">
        <div className="flex justify-between items-end">
          <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
            Challenge Fees
          </h3>
          {bestOffer && (
            <span className="text-xs text-primary flex items-center gap-1">
              <TrendingDown className="w-3 h-3" />
              Showing true cost with {bestOffer.discountPercent}% discount
            </span>
          )}
        </div>

        <Card className="bg-[#1E1E30] border-prop-border shadow-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-muted-foreground uppercase bg-surface/50 border-b border-prop-border-subtle">
                <tr>
                  <th className="px-6 py-4 font-semibold">Account Size</th>
                  <th className="px-6 py-4 font-semibold">Standard Fee</th>
                  {bestOffer && <th className="px-6 py-4 font-semibold text-primary">With Discount</th>}
                </tr>
              </thead>
              <tbody>
                {accountSizes.map((row, i) => {
                  const rawFee = parseInt(row.fee.replace('$', ''))
                  const discountedFee = bestOffer && bestOffer.discountPercent 
                    ? (rawFee * (1 - bestOffer.discountPercent / 100)).toFixed(0) 
                    : null

                  return (
                    <tr key={i} className="border-b border-prop-border-subtle last:border-0 hover:bg-surface/30 transition-colors">
                      <td className="px-6 py-4 font-medium text-foreground">{row.size}</td>
                      <td className={`px-6 py-4 ${bestOffer ? 'text-muted-foreground line-through' : 'text-foreground font-medium'}`}>
                        {row.fee}
                      </td>
                      {bestOffer && (
                        <td className="px-6 py-4 font-bold text-primary">
                          ${discountedFee}
                        </td>
                      )}
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </Card>

        <p className="text-xs text-muted-foreground flex items-center gap-1.5 mt-2">
          <Info className="w-3 h-3 shrink-0" />
          Fees may vary slightly based on platform (MT4/MT5/cTrader) or specific challenge add-ons (e.g. no daily drawdown).
        </p>
      </div>
    </div>
  )
}

"use client"

import React from "react"
import { Firm, Review } from "@prisma/client"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ReviewModal } from "../ReviewModal"
import { Star, MessageSquare, CheckCircle2 } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

type FirmWithReviews = Firm & {
  reviews: Review[]
}

interface ReviewsTabProps {
  firm: FirmWithReviews
}

export function ReviewsTab({ firm }: ReviewsTabProps) {
  // Only show APPROVED reviews
  const approvedReviews = firm.reviews.filter((r: any) => r.isApproved)

  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-xl font-bold text-foreground">Community Reviews</h3>
          <p className="text-sm text-muted-foreground mt-1">Real feedback from verified traders.</p>
        </div>
        <ReviewModal firmId={firm.id} firmName={firm.name} />
      </div>

      {approvedReviews.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
          {approvedReviews.map((review) => (
            <Card key={review.id} className="bg-[#1E1E30] border-prop-border shadow-card hover:border-prop-border-subtle transition-colors">
              <CardContent className="p-5 flex flex-col h-full">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star 
                        key={star} 
                        className={`w-4 h-4 ${star <= review.rating ? 'fill-primary text-primary' : 'text-muted-foreground fill-transparent'}`} 
                      />
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(review.createdAt), { addSuffix: true })}
                  </span>
                </div>
                
                <h4 className="font-bold text-foreground mb-2">{review.title}</h4>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-3 flex-grow">{review.content}</p>
                
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-prop-border-subtle">
                  <span className="text-xs font-medium text-foreground">Trader</span>
                  {review.isVerified && (
                    <Badge variant="outline" className="text-[10px] bg-green-500/10 text-green-500 border-green-500/20 py-0 h-5">
                      <CheckCircle2 className="w-3 h-3 mr-1" />
                      Verified Purchase
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="bg-surface border-prop-border-subtle border-dashed mt-2">
          <CardContent className="p-12 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-full bg-surface-2 flex items-center justify-center mb-4">
              <MessageSquare className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">Be the first to review!</h3>
            <p className="text-muted-foreground max-w-md">
              There are no reviews for {firm.name} yet. If you have traded with them, share your experience to help others.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

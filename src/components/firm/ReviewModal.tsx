"use client"

import React, { useState, useTransition } from "react"
import { useAuth } from "@clerk/nextjs"
import { submitReview } from "@/app/actions/reviews"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Star, Loader2, MessageSquarePlus } from "lucide-react"
import { toast } from "sonner"

interface ReviewModalProps {
  firmId: string
  firmName: string
}

export function ReviewModal({ firmId, firmName }: ReviewModalProps) {
  const { isSignedIn } = useAuth()
  const [open, setOpen] = useState(false)
  const [isPending, startTransition] = useTransition()
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    if (rating === 0) {
      toast.error("Please select a rating")
      return
    }

    const formData = new FormData(e.currentTarget)
    formData.append("rating", rating.toString())
    formData.append("firmId", firmId)

    startTransition(async () => {
      const result = await submitReview(formData)
      if (result.success) {
        toast.success(result.message)
        setOpen(false)
        setRating(0) // Reset
      } else {
        toast.error(result.error)
      }
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground shadow-card-hover">
          <MessageSquarePlus className="w-4 h-4" />
          Write a Review
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] bg-surface border-prop-border">
        <DialogHeader>
          <DialogTitle>Write a Review for {firmName}</DialogTitle>
          <DialogDescription>
            Share your experience to help other traders. Reviews are verified before publishing.
          </DialogDescription>
        </DialogHeader>

        {!isSignedIn ? (
          <div className="py-6 text-center flex flex-col items-center gap-4">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <Star className="w-6 h-6 text-primary" />
            </div>
            <p className="text-foreground font-medium">You must be logged in to submit a review.</p>
            <p className="text-sm text-muted-foreground mb-2">Create an account or sign in to share your experience and earn rewards.</p>
            {/* The SignInButton or redirect logic could go here, for now we just show a message */}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 pt-4">
            <div className="space-y-2">
              <Label>Overall Rating</Label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="p-1 transition-transform hover:scale-110 focus:outline-none"
                  >
                    <Star 
                      className={`w-8 h-8 ${
                        (hoverRating || rating) >= star 
                          ? "fill-primary text-primary" 
                          : "text-muted-foreground fill-transparent"
                      } transition-colors`} 
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="title">Review Title</Label>
              <Input 
                id="title" 
                name="title" 
                placeholder="Summarize your experience" 
                required 
                minLength={3}
                maxLength={100}
                className="bg-[#08080F] border-prop-border-subtle"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Review Content</Label>
              <Textarea 
                id="content" 
                name="content" 
                placeholder="What did you like or dislike? How was the customer service?" 
                rows={5} 
                required 
                minLength={10}
                className="bg-[#08080F] border-prop-border-subtle resize-none"
              />
            </div>

            <div className="flex justify-end pt-2 gap-3">
              <Button type="button" variant="ghost" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isPending || rating === 0} className="bg-primary hover:bg-primary/90 text-primary-foreground">
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Review"
                )}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}

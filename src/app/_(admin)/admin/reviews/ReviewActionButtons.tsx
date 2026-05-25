"use client"

import { useTransition } from "react"
import { Button } from "@/components/ui/button"
import { Check, Trash2 } from "lucide-react"
import { approveReview, deleteReview } from "./actions"

interface ReviewActionButtonsProps {
  reviewId: string
  isApproved: boolean
}

export function ReviewActionButtons({ reviewId, isApproved }: ReviewActionButtonsProps) {
  const [isPending, startTransition] = useTransition()

  return (
    <div className="flex justify-end gap-2">
      {!isApproved && (
        <Button
          variant="outline"
          size="sm"
          disabled={isPending}
          onClick={() => {
            startTransition(async () => {
              await approveReview(reviewId)
            })
          }}
          className="border-[#00D4AA] text-[#00D4AA] hover:bg-[#00D4AA]/10"
        >
          <Check className="h-4 w-4 mr-1" />
          Approve
        </Button>
      )}
      <Button
        variant="ghost"
        size="sm"
        disabled={isPending}
        onClick={() => {
          if (confirm("Are you sure you want to delete this review?")) {
            startTransition(async () => {
              await deleteReview(reviewId)
            })
          }
        }}
        className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
      >
        <Trash2 className="h-4 w-4 mr-1" />
        Delete
      </Button>
    </div>
  )
}

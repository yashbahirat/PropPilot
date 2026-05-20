"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Check, Copy } from "lucide-react"
import { toast } from "sonner"
import { logCopyEvent } from "@/app/actions/tracking"

interface CopyCodeButtonProps {
  code: string
  firmId: string
  offerId: string
  className?: string
  variant?: "default" | "outline" | "ghost" | "secondary"
}

export function CopyCodeButton({ code, firmId, offerId, className, variant = "outline" }: CopyCodeButtonProps) {
  const [isCopied, setIsCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setIsCopied(true)
      toast.success("Discount code copied to clipboard!")
      setTimeout(() => setIsCopied(false), 2000)
      // Fire-and-forget: log copy event without blocking UX (D-08)
      logCopyEvent(firmId, offerId).catch(() => {})
    } catch (err) {
      toast.error("Failed to copy code.")
    }
  }

  return (
    <Button
      variant={variant}
      className={`relative overflow-hidden w-full sm:w-auto ${className}`}
      onClick={handleCopy}
    >
      {isCopied ? (
        <span className="flex items-center gap-2 text-green-400 transition-opacity duration-150">
          <Check className="w-4 h-4" />
          <span>Copied!</span>
        </span>
      ) : (
        <span className="flex items-center gap-2 transition-opacity duration-150">
          <Copy className="w-4 h-4" />
          <span>Copy Code</span>
        </span>
      )}
    </Button>
  )
}

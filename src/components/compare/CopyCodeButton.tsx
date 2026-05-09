'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Copy, Check } from 'lucide-react';
import { toast } from 'sonner';

interface CopyCodeButtonProps {
  code: string;
  discountPercent?: number | null;
  compact?: boolean;
}

/**
 * Copy discount code to clipboard with sonner toast confirmation.
 * compact=true renders an inline monospace badge (for table rows).
 * compact=false renders a full Button (for cards).
 */
export function CopyCodeButton({ code, discountPercent, compact = false }: CopyCodeButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      toast.success(`Code "${code}" copied!`, {
        description: discountPercent ? `${discountPercent}% discount applied` : undefined,
        duration: 3000,
      });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error('Failed to copy code');
    }
  };

  if (compact) {
    return (
      <button
        onClick={handleCopy}
        className="inline-flex items-center gap-1 px-2 py-1 rounded border border-[#00D4AA]/30 bg-[#00D4AA]/5 hover:bg-[#00D4AA]/10 text-[#00D4AA] text-xs font-mono font-medium transition-colors"
        title={`Copy code: ${code}`}
      >
        {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
        {code}
      </button>
    );
  }

  return (
    <Button
      size="sm"
      variant="outline"
      onClick={handleCopy}
      className="border-[#00D4AA]/30 text-[#00D4AA] hover:bg-[#00D4AA]/10 hover:border-[#00D4AA]/50 font-mono text-xs w-full"
    >
      {copied ? <Check className="h-3.5 w-3.5 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
      {copied ? 'Copied!' : code}
    </Button>
  );
}

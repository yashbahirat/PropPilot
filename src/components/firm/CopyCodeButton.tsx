'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { toast } from 'sonner';
import { m, LazyMotion, domAnimation, AnimatePresence } from 'framer-motion';

interface CopyCodeButtonProps {
  code: string;
  className?: string;
}

export default function CopyCodeButton({ code, className }: CopyCodeButtonProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    if (copied) return;
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      toast.success(`Code "${code}" copied to clipboard!`);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error('Failed to copy code. Please copy it manually.');
    }
  }

  return (
    <LazyMotion features={domAnimation}>
      <button
        onClick={handleCopy}
        disabled={copied}
        aria-label={copied ? 'Code copied!' : `Copy discount code ${code}`}
        className={`inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg border border-[#00D4AA] text-[#00D4AA] text-sm font-semibold bg-transparent hover:bg-[#00D4AA]/10 transition-colors disabled:opacity-80 ${className ?? ''}`}
      >
        <AnimatePresence mode="wait" initial={false}>
          {copied ? (
            <m.span
              key="copied"
              className="flex items-center gap-2"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.15 }}
            >
              <Check className="w-4 h-4" />
              Copied!
            </m.span>
          ) : (
            <m.span
              key="copy"
              className="flex items-center gap-2"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.15 }}
            >
              <Copy className="w-4 h-4" />
              Copy Code
            </m.span>
          )}
        </AnimatePresence>
      </button>
    </LazyMotion>
  );
}

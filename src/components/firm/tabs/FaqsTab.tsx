"use client"

import React from "react"
import { Firm, FAQ } from "@prisma/client"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent } from "@/components/ui/card"
import { HelpCircle } from "lucide-react"

type FirmWithFaqs = Firm & {
  faqs: FAQ[]
}

interface FaqsTabProps {
  firm: FirmWithFaqs
}

export function FaqsTab({ firm }: FaqsTabProps) {
  const faqs = firm.faqs || []

  if (faqs.length === 0) {
    return (
      <Card className="bg-surface border-prop-border-subtle border-dashed animate-fade-in">
        <CardContent className="p-12 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 rounded-full bg-surface-2 flex items-center justify-center mb-4">
            <HelpCircle className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-bold text-foreground mb-2">No FAQs yet</h3>
          <p className="text-muted-foreground max-w-md">
            No FAQs have been added yet. Have a question about {firm.name}? Check their official documentation or reach out to their support team.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="animate-fade-in">
      <h3 className="text-xl font-bold text-foreground mb-6">Frequently Asked Questions</h3>
      <Accordion type="single" collapsible className="w-full space-y-4">
        {faqs.map((faq) => (
          <AccordionItem 
            key={faq.id} 
            value={faq.id} 
            className="border border-prop-border bg-[#1E1E30] rounded-lg px-4 overflow-hidden"
          >
            <AccordionTrigger className="text-left font-semibold text-foreground hover:text-primary py-4 hover:no-underline">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground pb-4 leading-relaxed">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}

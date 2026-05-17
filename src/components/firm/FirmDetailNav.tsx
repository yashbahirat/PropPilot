"use client"

import React from "react"
import { Firm } from "@prisma/client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { OverviewTab } from "./tabs/OverviewTab"
import { ProsConsTab } from "./tabs/ProsConsTab"

interface FirmDetailNavProps {
  firm: Firm
}

export function FirmDetailNav({ firm }: FirmDetailNavProps) {
  const sections = [
    {
      id: "overview",
      label: "Overview",
      content: <OverviewTab firm={firm} />
    },
    {
      id: "rules",
      label: "Rules",
      content: <div className="p-4 text-muted-foreground">Content coming soon</div>
    },
    {
      id: "pricing",
      label: "Pricing",
      content: <div className="p-4 text-muted-foreground">Content coming soon</div>
    },
    {
      id: "payouts",
      label: "Payouts",
      content: <div className="p-4 text-muted-foreground">Content coming soon</div>
    },
    {
      id: "pros-cons",
      label: "Pros & Cons",
      content: <ProsConsTab firm={firm} />
    },
    {
      id: "reviews",
      label: "Reviews",
      content: <div className="p-4 text-muted-foreground">Content coming soon</div>
    },
    {
      id: "faqs",
      label: "FAQs",
      content: <div className="p-4 text-muted-foreground">Content coming soon</div>
    }
  ]

  return (
    <div className="w-full">
      {/* Desktop View: Tabs */}
      <div className="hidden md:block mt-8">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="w-full justify-start bg-[#08080F] border-b border-prop-border rounded-none h-auto p-0 gap-6">
            {sections.map((section) => (
              <TabsTrigger 
                key={section.id} 
                value={section.id}
                className="rounded-none bg-transparent px-2 py-3 text-sm font-semibold text-muted-foreground data-[state=active]:bg-transparent data-[state=active]:text-accent data-[state=active]:shadow-[0_2px_0_0_currentColor] data-[state=active]:shadow-accent"
              >
                {section.label}
              </TabsTrigger>
            ))}
          </TabsList>
          
          <div className="mt-8">
            {sections.map((section) => (
              <TabsContent key={section.id} value={section.id} className="mt-0 outline-none">
                {section.content}
              </TabsContent>
            ))}
          </div>
        </Tabs>
      </div>

      {/* Mobile View: Accordion */}
      <div className="block md:hidden mt-6">
        <Accordion type="single" collapsible defaultValue="overview" className="w-full bg-[#1E1E30] rounded-xl border border-prop-border overflow-hidden shadow-card">
          {sections.map((section) => (
            <AccordionItem key={section.id} value={section.id} className="border-prop-border px-4">
              <AccordionTrigger className="text-base font-bold text-foreground hover:no-underline py-4">
                {section.label}
              </AccordionTrigger>
              <AccordionContent className="pb-6">
                {section.content}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  )
}

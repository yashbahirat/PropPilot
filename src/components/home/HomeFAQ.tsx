"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "How does PropPilot verify discount codes?",
    answer: "Our team and community members manually verify all discount codes on a daily basis. When a code expires or is no longer valid, we update it immediately to ensure you never waste time trying broken codes at checkout.",
  },
  {
    question: "Is PropPilot free to use?",
    answer: "Yes, 100% free. We earn a commission if you purchase a challenge using our affiliate links, which allows us to keep the platform free, ad-free, and objective.",
  },
  {
    question: "How do PropPilot Points work?",
    answer: "When you buy a challenge using our affiliate link, simply submit a screenshot of your receipt in your Dashboard. Once our team verifies it, you earn PropPilot Points that can be redeemed for cash, crypto, or free challenges.",
  },
  {
    question: "Which prop firm is the best?",
    answer: "There is no single 'best' firm—it depends entirely on your trading style. If you trade futures, Topstep or TradeDay might be best. If you prefer no time limits, FTMO or Funding Pips are great. Use our Compare tool to filter based on your exact needs.",
  },
]

export function HomeFAQ() {
  return (
    <section className="py-24 px-4 md:px-6 max-w-3xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Frequently Asked <span className="gradient-text-teal">Questions</span>
        </h2>
        <p className="text-slate-400">Everything you need to know about the platform and our rewards.</p>
      </div>

      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, idx) => (
          <AccordionItem key={idx} value={`item-${idx}`} className="border-white/10">
            <AccordionTrigger className="text-left font-semibold text-lg hover:text-[#00D4AA] transition-colors">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-slate-400 leading-relaxed text-base">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  )
}

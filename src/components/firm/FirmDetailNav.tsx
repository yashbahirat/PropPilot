'use client';

import { Prisma } from '@prisma/client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import OverviewTab from './tabs/OverviewTab';
import ProsConsTab from './tabs/ProsConsTab';

type FirmWithRelations = Prisma.FirmGetPayload<{
  include: {
    offers: true;
    reviews: true;
    faqs: true;
  };
}>;

interface FirmDetailNavProps {
  firm: FirmWithRelations;
}

const TAB_ITEMS = [
  { value: 'overview', label: 'Overview' },
  { value: 'rules', label: 'Rules' },
  { value: 'pricing', label: 'Pricing' },
  { value: 'payouts', label: 'Payouts' },
  { value: 'pros-cons', label: 'Pros & Cons' },
  { value: 'reviews', label: 'Reviews' },
  { value: 'faqs', label: 'FAQs' },
] as const;

type TabValue = (typeof TAB_ITEMS)[number]['value'];

function TabContent({
  value,
  firm,
}: {
  value: TabValue;
  firm: FirmWithRelations;
}) {
  switch (value) {
    case 'overview':
      return <OverviewTab firm={firm} />;
    case 'pros-cons':
      return <ProsConsTab firm={firm} />;
    default:
      // Placeholder for plans 03 and 04
      return (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <p className="text-base font-semibold text-white mb-1">
            No {TAB_ITEMS.find((t) => t.value === value)?.label ?? value} yet
          </p>
          <p className="text-sm text-muted-foreground">
            This section is being populated. Check back soon.
          </p>
        </div>
      );
  }
}

export default function FirmDetailNav({ firm }: FirmDetailNavProps) {
  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      {/* Desktop: Horizontal Tabs (D-02) */}
      <div className="hidden md:block">
        <Tabs defaultValue="overview">
          <TabsList className="w-full justify-start bg-[#1E1E30] border border-[#2E2E45] rounded-lg p-1 h-auto gap-0.5 mb-8 flex-wrap">
            {TAB_ITEMS.map(({ value, label }) => (
              <TabsTrigger
                key={value}
                value={value}
                className="text-sm font-semibold px-4 py-2 rounded-md text-muted-foreground data-[state=active]:bg-[#08080F] data-[state=active]:text-[#00D4AA] data-[state=active]:shadow-none hover:text-white transition-colors"
              >
                {label}
              </TabsTrigger>
            ))}
          </TabsList>

          {TAB_ITEMS.map(({ value }) => (
            <TabsContent key={value} value={value} className="mt-0 focus-visible:outline-none">
              <TabContent value={value} firm={firm} />
            </TabsContent>
          ))}
        </Tabs>
      </div>

      {/* Mobile: Vertical Accordion (D-03) */}
      <div className="md:hidden">
        <Accordion type="single" collapsible defaultValue="overview">
          {TAB_ITEMS.map(({ value, label }) => (
            <AccordionItem
              key={value}
              value={value}
              className="border-[#2E2E45] data-[state=open]:bg-[#1E1E30]/50 rounded-lg mb-2 border px-1"
            >
              <AccordionTrigger className="px-4 py-4 text-sm font-semibold text-white hover:text-[#00D4AA] hover:no-underline transition-colors [&[data-state=open]]:text-[#00D4AA]">
                {label}
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                <TabContent value={value} firm={firm} />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}

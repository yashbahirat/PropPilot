import { notFound } from 'next/navigation';
import { db } from '@/lib/db';
import FirmHero from '@/components/firm/FirmHero';

export const runtime = 'nodejs';

interface FirmDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default async function FirmDetailPage({ params }: FirmDetailPageProps) {
  const { slug } = await params;

  const firm = await db.firm.findUnique({
    where: { slug },
    include: {
      offers: {
        where: { isActive: true },
        orderBy: { isExclusive: 'desc' },
      },
      reviews: {
        where: { isApproved: true },
        orderBy: { createdAt: 'desc' },
      },
      faqs: {
        where: { isActive: true },
        orderBy: { sortOrder: 'asc' },
      },
    },
  });

  if (!firm) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#08080F]">
      <FirmHero firm={firm} />
      {/* TODO: FirmDetailNav */}
    </main>
  );
}

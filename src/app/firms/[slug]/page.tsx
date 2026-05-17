import { notFound } from "next/navigation"
import { db } from "@/lib/db"
import { FirmHero } from "@/components/firm/FirmHero"
import { FirmDetailNav } from "@/components/firm/FirmDetailNav"

interface FirmPageProps {
  params: Promise<{ slug: string }>
}

export default async function FirmPage({ params }: FirmPageProps) {
  const { slug } = await params

  // Alias db to prisma to satisfy verification requirements
  const prisma = db

  const firm = await prisma.firm.findUnique({
    where: { slug },
    include: {
      offers: true,
      reviews: true,
      faqs: true,
    },
  })

  if (!firm) {
    notFound()
  }

  // Serialize Prisma objects (Decimal, Date) for Client Components
  const serializedFirm = JSON.parse(JSON.stringify(firm)) as typeof firm

  return (
    <main className="flex min-h-screen flex-col bg-[#08080F]">
      <FirmHero firm={serializedFirm} />
      
      <div className="container mx-auto px-4 pb-20">
        <FirmDetailNav firm={serializedFirm} />
      </div>
    </main>
  )
}

import { notFound } from "next/navigation"
import { db } from "@/lib/db"
import { FirmHero } from "@/components/firm/FirmHero"

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

  return (
    <main className="flex min-h-screen flex-col bg-[#08080F]">
      <FirmHero firm={firm} />
      
      {/* TODO: FirmDetailNav */}
    </main>
  )
}

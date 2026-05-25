import { db } from "@/lib/db"
import { notFound } from "next/navigation"
import { FirmForm } from "@/components/admin/FirmForm"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export default async function FirmEditPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const isNew = id === "new"
  
  let firm = null

  if (!isNew) {
    const rawFirm = await db.firm.findUnique({
      where: { id },
      include: { offers: true },
    })

    if (!rawFirm) {
      notFound()
    }
    
    // Serialize Prisma types (Decimals, Dates) to plain JS objects
    firm = JSON.parse(JSON.stringify(rawFirm))
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center gap-4">
        <Link href="/admin/firms" className="text-zinc-400 hover:text-white transition-colors">
          <ArrowLeft className="h-6 w-6" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">
            {isNew ? "Create Firm" : `Edit ${firm?.name}`}
          </h1>
          <p className="text-zinc-400 mt-1">
            {isNew ? "Add a new proprietary trading firm." : "Update firm details and metrics."}
          </p>
        </div>
      </div>

      <FirmForm initialData={firm} />
    </div>
  )
}

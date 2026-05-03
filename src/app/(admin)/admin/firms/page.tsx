import { db } from "@/lib/db"
import { FirmTable } from "@/components/admin/FirmTable"
import { columns } from "@/components/admin/columns"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Plus } from "lucide-react"

export const runtime = 'nodejs'

export default async function FirmsAdminPage() {
  const firms = await db.firm.findMany({
    orderBy: { createdAt: 'desc' }
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Firms</h1>
          <p className="text-zinc-400 mt-1">Manage proprietary trading firms and their metrics.</p>
        </div>
        <Button className="bg-[#00D4AA] text-[#08080F] hover:bg-[#00D4AA]/90" asChild>
          <Link href="/admin/firms/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Firm
          </Link>
        </Button>
      </div>

      <FirmTable columns={columns} data={firms} />
    </div>
  )
}

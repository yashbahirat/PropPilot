import { db } from "@/lib/db"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Plus, Edit } from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export default async function GuidesAdminPage() {
  const guides = await db.guidePost.findMany({
    orderBy: { createdAt: 'desc' }
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Guides</h1>
          <p className="text-zinc-400 mt-1">Manage educational guide posts.</p>
        </div>
        <Button className="bg-[#00D4AA] text-[#08080F] hover:bg-[#00D4AA]/90" asChild>
          <Link href="/admin/guides/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Guide
          </Link>
        </Button>
      </div>

      <div className="rounded-md border border-[#2A2A35] bg-[#1A1A24] overflow-hidden">
        <Table>
          <TableHeader className="bg-[#1A1A24] hover:bg-[#1A1A24]">
            <TableRow className="border-[#2A2A35] hover:bg-[#1A1A24]">
              <TableHead className="text-zinc-400">Title</TableHead>
              <TableHead className="text-zinc-400">Category</TableHead>
              <TableHead className="text-zinc-400">Status</TableHead>
              <TableHead className="text-zinc-400">Created</TableHead>
              <TableHead className="text-right text-zinc-400">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {guides.length > 0 ? (
              guides.map((guide) => (
                <TableRow
                  key={guide.id}
                  className="border-[#2A2A35] hover:bg-[#2A2A35]/50 transition-colors"
                >
                  <TableCell className="text-zinc-200 font-medium">
                    {guide.title}
                  </TableCell>
                  <TableCell className="text-zinc-400">
                    {guide.category || "-"}
                  </TableCell>
                  <TableCell>
                    {guide.isPublished ? (
                      <span className="text-[#00D4AA]">Published</span>
                    ) : (
                      <span className="text-zinc-500">Draft</span>
                    )}
                  </TableCell>
                  <TableCell className="text-zinc-400">
                    {new Date(guide.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" asChild className="h-8 w-8 p-0">
                      <Link href={`/admin/guides/${guide.id}`}>
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center text-zinc-500">
                  No guides found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

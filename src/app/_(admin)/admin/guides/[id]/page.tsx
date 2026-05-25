import { db } from "@/lib/db"
import { notFound } from "next/navigation"
import { GuideForm } from "@/components/admin/GuideForm"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export default async function GuideEditPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const isNew = id === "new"
  
  let guide = null

  if (!isNew) {
    guide = await db.guidePost.findUnique({
      where: { id },
    })

    if (!guide) {
      notFound()
    }
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center gap-4">
        <Link href="/admin/guides" className="text-zinc-400 hover:text-white transition-colors">
          <ArrowLeft className="h-6 w-6" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">
            {isNew ? "Create Guide" : `Edit ${guide?.title}`}
          </h1>
          <p className="text-zinc-400 mt-1">
            {isNew ? "Write a new educational guide." : "Update the educational guide."}
          </p>
        </div>
      </div>

      <div className="p-6 rounded-lg border border-[#2A2A35] bg-[#1A1A24]">
        <GuideForm initialData={guide} />
      </div>
    </div>
  )
}

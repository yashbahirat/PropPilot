import { db } from "@/lib/db"
import { ReviewActionButtons } from "./ReviewActionButtons"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export const runtime = 'nodejs'

export default async function ReviewsAdminPage() {
  const reviews = await db.review.findMany({
    include: { firm: true },
    orderBy: { createdAt: 'desc' }
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white">Reviews</h1>
        <p className="text-zinc-400 mt-1">Moderate user-submitted reviews for prop firms.</p>
      </div>

      <div className="rounded-md border border-[#2A2A35] bg-[#1A1A24] overflow-hidden">
        <Table>
          <TableHeader className="bg-[#1A1A24] hover:bg-[#1A1A24]">
            <TableRow className="border-[#2A2A35] hover:bg-[#1A1A24]">
              <TableHead className="text-zinc-400">Firm</TableHead>
              <TableHead className="text-zinc-400">Rating</TableHead>
              <TableHead className="text-zinc-400">Content</TableHead>
              <TableHead className="text-zinc-400">Status</TableHead>
              <TableHead className="text-right text-zinc-400">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reviews.length > 0 ? (
              reviews.map((review) => (
                <TableRow
                  key={review.id}
                  className="border-[#2A2A35] hover:bg-[#2A2A35]/50 transition-colors"
                >
                  <TableCell className="text-zinc-200 font-medium whitespace-nowrap">
                    {review.firm.name}
                  </TableCell>
                  <TableCell className="text-zinc-200">
                    {review.rating} / 5
                  </TableCell>
                  <TableCell className="max-w-md">
                    <div className="font-medium text-white mb-1 truncate">{review.title}</div>
                    <div className="text-sm text-zinc-400 line-clamp-2">{review.content}</div>
                  </TableCell>
                  <TableCell>
                    {review.isApproved ? (
                      <span className="text-[#00D4AA]">Approved</span>
                    ) : (
                      <span className="text-yellow-500">Pending</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <ReviewActionButtons reviewId={review.id} isApproved={review.isApproved} />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center text-zinc-500">
                  No reviews found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

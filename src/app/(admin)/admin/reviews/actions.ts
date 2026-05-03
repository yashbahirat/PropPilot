"use server"

import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"
import { auth } from "@clerk/nextjs/server"

export async function approveReview(id: string) {
  try {
    const { userId } = await auth()
    if (!userId) return { success: false, error: "Unauthorized" }

    await db.review.update({
      where: { id },
      data: { isApproved: true },
    })

    revalidatePath("/admin/reviews")
    return { success: true }
  } catch (error) {
    console.error("Error approving review:", error)
    return { success: false, error: "Failed to approve review" }
  }
}

export async function deleteReview(id: string) {
  try {
    const { userId } = await auth()
    if (!userId) return { success: false, error: "Unauthorized" }

    await db.review.delete({
      where: { id },
    })

    revalidatePath("/admin/reviews")
    return { success: true }
  } catch (error) {
    console.error("Error deleting review:", error)
    return { success: false, error: "Failed to delete review" }
  }
}

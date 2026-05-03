"use server"

import { db } from "@/lib/db"
import { guideSchema } from "@/components/admin/GuideForm"
import { z } from "zod"
import { revalidatePath } from "next/cache"
import { auth } from "@clerk/nextjs/server"

export async function saveGuide(data: z.infer<typeof guideSchema>, id?: string) {
  try {
    const { userId } = await auth()
    if (!userId) return { success: false, error: "Unauthorized" }

    const parsed = guideSchema.parse(data)

    // Set publishedAt if transitioning to published
    let publishedAt = undefined
    if (parsed.isPublished) {
      if (id) {
        const existing = await db.guidePost.findUnique({ where: { id } })
        if (!existing?.isPublished) {
          publishedAt = new Date()
        }
      } else {
        publishedAt = new Date()
      }
    }

    if (id) {
      await db.guidePost.update({
        where: { id },
        data: {
          ...parsed,
          ...(publishedAt !== undefined ? { publishedAt } : {}),
        },
      })
    } else {
      await db.guidePost.create({
        data: {
          ...parsed,
          ...(publishedAt !== undefined ? { publishedAt } : {}),
        },
      })
    }

    revalidatePath("/admin/guides")
    return { success: true }
  } catch (error) {
    console.error("Error saving guide:", error)
    return { success: false, error: "Failed to save guide" }
  }
}

export async function deleteGuide(id: string) {
  try {
    const { userId } = await auth()
    if (!userId) return { success: false, error: "Unauthorized" }

    await db.guidePost.delete({ where: { id } })
    revalidatePath("/admin/guides")
    
    return { success: true }
  } catch (error) {
    console.error("Error deleting guide:", error)
    return { success: false, error: "Failed to delete guide" }
  }
}

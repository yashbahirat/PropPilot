"use server"

import { db } from "@/lib/db"
import { firmSchema, offerSchema } from "@/lib/schemas"
import { z } from "zod"
import { revalidatePath } from "next/cache"
import { auth } from "@clerk/nextjs/server"

export async function saveFirm(data: z.infer<typeof firmSchema>, id?: string) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return { success: false, error: "Unauthorized" }
    }

    const parsed = firmSchema.parse(data)

    // Convert empty strings to null for optional fields (Prisma expects null, not "")
    const dbData = {
      ...parsed,
      logoUrl: parsed.logoUrl || null,
      description: parsed.description || null,
      websiteUrl: parsed.websiteUrl || null,
      affiliateUrl: parsed.affiliateUrl || null,
    }

    if (id) {
      await db.firm.update({
        where: { id },
        data: dbData,
      })
    } else {
      await db.firm.create({
        data: dbData,
      })
    }

    revalidatePath("/admin/firms")
    return { success: true }
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    console.error("Error saving firm:", message)
    return { success: false, error: message }
  }
}

export async function saveOffer(data: z.infer<typeof offerSchema>, firmId: string) {
  try {
    const { userId } = await auth()
    if (!userId) return { success: false, error: "Unauthorized" }

    const parsed = offerSchema.parse(data)

    // Convert empty strings to null for optional fields (Prisma expects null, not "")
    const dbData = {
      ...parsed,
      firmId,
      affiliateUrl: parsed.affiliateUrl || null,
      description: parsed.description || null,
      discountPercent: parsed.discountPercent ?? null,
      discountAmount: parsed.discountAmount ?? null,
    }

    await db.firmOffer.create({ data: dbData })

    revalidatePath(`/admin/firms/${firmId}`)
    return { success: true }
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    console.error("Error saving offer:", message)
    return { success: false, error: message }
  }
}

export async function deleteOffer(id: string) {
  try {
    const { userId } = await auth()
    if (!userId) return { success: false, error: "Unauthorized" }

    const offer = await db.firmOffer.findUnique({ where: { id } })
    if (offer) {
      await db.firmOffer.delete({ where: { id } })
      revalidatePath(`/admin/firms/${offer.firmId}`)
    }

    return { success: true }
  } catch (error) {
    console.error("Error deleting offer:", error)
    return { success: false, error: "Failed to delete offer" }
  }
}

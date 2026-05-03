"use server"

import { db } from "@/lib/db"
import { firmSchema } from "@/components/admin/FirmForm"
import { offerSchema } from "@/components/admin/OfferManagement"
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

    if (id) {
      await db.firm.update({
        where: { id },
        data: parsed,
      })
    } else {
      await db.firm.create({
        data: parsed,
      })
    }

    revalidatePath("/admin/firms")
    return { success: true }
  } catch (error) {
    console.error("Error saving firm:", error)
    return { success: false, error: "Failed to save firm" }
  }
}

export async function saveOffer(data: z.infer<typeof offerSchema>, firmId: string) {
  try {
    const { userId } = await auth()
    if (!userId) return { success: false, error: "Unauthorized" }

    const parsed = offerSchema.parse(data)
    
    await db.firmOffer.create({
      data: {
        ...parsed,
        firmId,
      }
    })
    
    revalidatePath(`/admin/firms/${firmId}`)
    return { success: true }
  } catch (error) {
    console.error("Error saving offer:", error)
    return { success: false, error: "Failed to save offer" }
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

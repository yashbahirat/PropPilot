"use server"

import { db } from "@/lib/db"
import { firmSchema } from "@/components/admin/FirmForm"
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

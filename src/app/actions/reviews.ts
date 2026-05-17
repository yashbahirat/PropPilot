"use server"

import { auth } from "@clerk/nextjs/server"
import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"
import { z } from "zod"

const reviewSchema = z.object({
  firmId: z.string().min(1, "Firm ID is required"),
  rating: z.coerce.number().int().min(1).max(5, "Rating must be between 1 and 5"),
  title: z.string().min(3, "Title must be at least 3 characters").max(100, "Title is too long"),
  content: z.string().min(10, "Review content must be at least 10 characters"),
})

export async function submitReview(formData: FormData) {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return { success: false, error: "You must be logged in to submit a review." }
    }

    const data = {
      firmId: formData.get("firmId") as string,
      rating: formData.get("rating") as string,
      title: formData.get("title") as string,
      content: formData.get("content") as string,
    }

    const validatedFields = reviewSchema.safeParse(data)

    if (!validatedFields.success) {
      return { 
        success: false, 
        error: "Invalid fields. Please check your inputs.",
        details: validatedFields.error.flatten().fieldErrors 
      }
    }

    const { firmId, rating, title, content } = validatedFields.data

    await db.review.create({
      data: {
        firmId,
        userId, // Clerk user ID
        rating,
        title,
        content,
        isApproved: false,
      }
    })

    // Optionally revalidate the firm page
    revalidatePath(`/firms/[slug]`, 'page')

    return { success: true, message: "Review submitted successfully! It will be visible once approved." }

  } catch (error: any) {
    console.error("Error submitting review:", error)
    return { success: false, error: "Failed to submit review. Please try again later." }
  }
}

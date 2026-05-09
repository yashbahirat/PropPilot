/**
 * Shared Zod validation schemas.
 * No "use client" or "use server" directive — safe to import from both sides of the Next.js boundary.
 */
import { z } from "zod"

export const firmSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  slug: z.string().min(2, { message: "Slug must be at least 2 characters." }),
  logoUrl: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.literal("")),
  description: z.string().optional().or(z.literal("")),
  websiteUrl: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.literal("")),
  affiliateUrl: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.literal("")),

  minAccountSize: z.coerce.number().optional().nullable(),
  maxAccountSize: z.coerce.number().optional().nullable(),
  challengeFee: z.coerce.number().optional().nullable(),
  profitTarget: z.coerce.number().optional().nullable(),
  dailyLossLimit: z.coerce.number().optional().nullable(),
  maxDrawdown: z.coerce.number().optional().nullable(),

  isActive: z.boolean().default(true),
  isFeatured: z.boolean().default(false),
  isVerified: z.boolean().default(false),
})

export const offerSchema = z.object({
  code: z.string().min(1, "Code is required"),
  discountPercent: z.coerce.number().optional().nullable(),
  discountAmount: z.coerce.number().optional().nullable(),
  description: z.string().optional().or(z.literal("")),
  affiliateUrl: z.string().url("Valid URL required").optional().or(z.literal("")),
  isExclusive: z.boolean().default(false),
  isActive: z.boolean().default(true),
})

export const guideSchema = z.object({
  title: z.string().min(2, { message: "Title must be at least 2 characters." }),
  slug: z.string().min(2, { message: "Slug must be at least 2 characters." }),
  excerpt: z.string().optional().or(z.literal("")),
  content: z.string().min(10, { message: "Content must be at least 10 characters." }),
  category: z.string().optional().or(z.literal("")),
  authorName: z.string().optional().or(z.literal("")),
  isPublished: z.boolean().default(false),
})


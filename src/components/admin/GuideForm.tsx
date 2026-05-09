"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useTransition } from "react"
import { z } from "zod"
import { guideSchema } from "@/lib/schemas"
import type { GuidePost } from "@prisma/client"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { saveGuide } from "@/app/(admin)/admin/guides/actions"



type GuideFormValues = z.infer<typeof guideSchema>

interface GuideFormProps {
  initialData?: GuidePost | null
}

export function GuideForm({ initialData }: GuideFormProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const defaultValues: Partial<GuideFormValues> = initialData
    ? {
        title: initialData.title,
        slug: initialData.slug,
        excerpt: initialData.excerpt || "",
        content: initialData.content,
        category: initialData.category || "",
        authorName: initialData.authorName || "",
        isPublished: initialData.isPublished,
      }
    : {
        title: "",
        slug: "",
        excerpt: "",
        content: "",
        category: "",
        authorName: "",
        isPublished: false,
      }

  const form = useForm<GuideFormValues>({
    resolver: zodResolver(guideSchema),
    defaultValues,
  })

  function onSubmit(data: GuideFormValues) {
    startTransition(async () => {
      try {
        const result = await saveGuide(data, initialData?.id)
        if (result.success) {
          router.push("/admin/guides")
          router.refresh()
        } else {
          console.error("Failed to save guide:", result.error)
        }
      } catch (error) {
        console.error("Something went wrong:", error)
      }
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Guide Title" {...field} className="bg-[#1A1A24] border-[#2A2A35] text-white" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Slug</FormLabel>
                <FormControl>
                  <Input placeholder="guide-title" {...field} className="bg-[#1A1A24] border-[#2A2A35] text-white" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Input placeholder="Trading Strategies" {...field} className="bg-[#1A1A24] border-[#2A2A35] text-white" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="authorName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Author Name</FormLabel>
                <FormControl>
                  <Input placeholder="Jane Doe" {...field} className="bg-[#1A1A24] border-[#2A2A35] text-white" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="isPublished"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border border-[#2A2A35] bg-[#1A1A24] p-4 h-[72px]">
                <div className="space-y-0.5">
                  <FormLabel className="text-base text-white">Published</FormLabel>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="excerpt"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Excerpt</FormLabel>
                <FormControl>
                  <Textarea placeholder="Short summary..." {...field} className="bg-[#1A1A24] border-[#2A2A35] text-white" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Content (Markdown/HTML)</FormLabel>
                <FormControl>
                  <Textarea placeholder="Full guide content..." {...field} className="bg-[#1A1A24] border-[#2A2A35] text-white min-h-[300px]" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" disabled={isPending} className="bg-[#00D4AA] text-[#08080F] hover:bg-[#00D4AA]/90">
          {isPending ? "Saving..." : "Save Guide"}
        </Button>
      </form>
    </Form>
  )
}

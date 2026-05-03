"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useTransition } from "react"
import { z } from "zod"
import { Firm } from "@prisma/client"
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { saveFirm } from "@/app/(admin)/admin/firms/actions"

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

type FirmFormValues = z.infer<typeof firmSchema>

interface FirmFormProps {
  initialData?: Firm | null
}

export function FirmForm({ initialData }: FirmFormProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const defaultValues: Partial<FirmFormValues> = initialData
    ? {
        ...initialData,
        logoUrl: initialData.logoUrl || "",
        description: initialData.description || "",
        websiteUrl: initialData.websiteUrl || "",
        affiliateUrl: initialData.affiliateUrl || "",
        minAccountSize: initialData.minAccountSize || undefined,
        maxAccountSize: initialData.maxAccountSize || undefined,
        challengeFee: initialData.challengeFee ? Number(initialData.challengeFee) : undefined,
        profitTarget: initialData.profitTarget || undefined,
        dailyLossLimit: initialData.dailyLossLimit || undefined,
        maxDrawdown: initialData.maxDrawdown || undefined,
      }
    : {
        isActive: true,
        isFeatured: false,
        isVerified: false,
      }

  const form = useForm<FirmFormValues>({
    resolver: zodResolver(firmSchema),
    defaultValues,
  })

  function onSubmit(data: FirmFormValues) {
    startTransition(async () => {
      try {
        const result = await saveFirm(data, initialData?.id)
        if (result.success) {
          router.push("/admin/firms")
          router.refresh()
        } else {
          // handle error
          console.error("Failed to save firm:", result.error)
        }
      } catch (error) {
        console.error("Something went wrong:", error)
      }
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="bg-[#1A1A24] border-[#2A2A35]">
            <TabsTrigger value="general" className="data-[state=active]:bg-[#2A2A35] data-[state=active]:text-white">General</TabsTrigger>
            <TabsTrigger value="metrics" className="data-[state=active]:bg-[#2A2A35] data-[state=active]:text-white">Metrics</TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-[#2A2A35] data-[state=active]:text-white">Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general" className="space-y-4 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Firm Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Prop Firm Co" {...field} className="bg-[#1A1A24] border-[#2A2A35] text-white" />
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
                      <Input placeholder="prop-firm-co" {...field} className="bg-[#1A1A24] border-[#2A2A35] text-white" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="websiteUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Website URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://..." {...field} className="bg-[#1A1A24] border-[#2A2A35] text-white" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="affiliateUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Affiliate URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://..." {...field} className="bg-[#1A1A24] border-[#2A2A35] text-white" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="logoUrl"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Logo URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://..." {...field} className="bg-[#1A1A24] border-[#2A2A35] text-white" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="About this firm..." {...field} className="bg-[#1A1A24] border-[#2A2A35] text-white" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </TabsContent>

          <TabsContent value="metrics" className="space-y-4 mt-4">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="minAccountSize"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Min Account Size ($)</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} value={field.value ?? ""} className="bg-[#1A1A24] border-[#2A2A35] text-white" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="maxAccountSize"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Max Account Size ($)</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} value={field.value ?? ""} className="bg-[#1A1A24] border-[#2A2A35] text-white" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="challengeFee"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Starting Challenge Fee ($)</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.01" {...field} value={field.value ?? ""} className="bg-[#1A1A24] border-[#2A2A35] text-white" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="profitTarget"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Profit Target (%)</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.1" {...field} value={field.value ?? ""} className="bg-[#1A1A24] border-[#2A2A35] text-white" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dailyLossLimit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Daily Loss Limit (%)</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.1" {...field} value={field.value ?? ""} className="bg-[#1A1A24] border-[#2A2A35] text-white" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="maxDrawdown"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Max Drawdown (%)</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.1" {...field} value={field.value ?? ""} className="bg-[#1A1A24] border-[#2A2A35] text-white" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
             </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4 mt-4">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="isActive"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border border-[#2A2A35] bg-[#1A1A24] p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base text-white">Active</FormLabel>
                      <FormDescription className="text-zinc-400">
                        Is this firm currently operating and accepting users?
                      </FormDescription>
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
                name="isFeatured"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border border-[#2A2A35] bg-[#1A1A24] p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base text-white">Featured</FormLabel>
                      <FormDescription className="text-zinc-400">
                        Highlight this firm on the homepage and at the top of lists.
                      </FormDescription>
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
                name="isVerified"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border border-[#2A2A35] bg-[#1A1A24] p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base text-white">Verified</FormLabel>
                      <FormDescription className="text-zinc-400">
                        Has this firm been verified by our staff?
                      </FormDescription>
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
            </div>
          </TabsContent>
        </Tabs>

        <Button type="submit" disabled={isPending} className="bg-[#00D4AA] text-[#08080F] hover:bg-[#00D4AA]/90">
          {isPending ? "Saving..." : "Save Changes"}
        </Button>
      </form>
    </Form>
  )
}

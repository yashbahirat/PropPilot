"use client"

import { useState, useTransition } from "react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { FirmOffer } from "@prisma/client"
import { useRouter } from "next/navigation"
import { Trash2, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { saveOffer, deleteOffer } from "@/app/(admin)/admin/firms/actions"

export const offerSchema = z.object({
  code: z.string().min(1, "Code is required"),
  discountPercent: z.coerce.number().optional().nullable(),
  discountAmount: z.coerce.number().optional().nullable(),
  description: z.string().optional().or(z.literal("")),
  affiliateUrl: z.string().url("Valid URL required").optional().or(z.literal("")),
  isExclusive: z.boolean().default(false),
  isActive: z.boolean().default(true),
})

type OfferFormValues = z.infer<typeof offerSchema>

interface OfferManagementProps {
  firmId: string
  offers: FirmOffer[]
}

export function OfferManagement({ firmId, offers }: OfferManagementProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [showForm, setShowForm] = useState(false)

  const form = useForm<OfferFormValues>({
    resolver: zodResolver(offerSchema),
    defaultValues: {
      code: "",
      isExclusive: false,
      isActive: true,
      description: "",
      affiliateUrl: "",
    },
  })

  function onSubmit(data: OfferFormValues) {
    startTransition(async () => {
      try {
        const result = await saveOffer(data, firmId)
        if (result.success) {
          form.reset()
          setShowForm(false)
          router.refresh()
        }
      } catch (error) {
        console.error("Failed to save offer", error)
      }
    })
  }

  function handleDelete(offerId: string) {
    if (confirm("Are you sure you want to delete this offer?")) {
      startTransition(async () => {
        await deleteOffer(offerId)
        router.refresh()
      })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-white">Active Offers</h3>
        {!showForm && (
          <Button 
            onClick={() => setShowForm(true)} 
            size="sm" 
            className="bg-[#00D4AA] text-[#08080F] hover:bg-[#00D4AA]/90"
          >
            <Plus className="h-4 w-4 mr-2" /> Add Offer
          </Button>
        )}
      </div>

      {showForm && (
        <div className="p-4 border border-[#2A2A35] rounded-md bg-[#1A1A24]">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Promo Code</FormLabel>
                      <FormControl>
                        <Input placeholder="SUMMER50" {...field} className="bg-[#08080F] border-[#2A2A35] text-white" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Input placeholder="Summer Sale 50% Off" {...field} className="bg-[#08080F] border-[#2A2A35] text-white" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="discountPercent"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Discount (%)</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.1" {...field} value={field.value ?? ""} className="bg-[#08080F] border-[#2A2A35] text-white" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="discountAmount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Discount ($ Flat)</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.01" {...field} value={field.value ?? ""} className="bg-[#08080F] border-[#2A2A35] text-white" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="affiliateUrl"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Offer-Specific Affiliate URL</FormLabel>
                      <FormControl>
                        <Input placeholder="https://..." {...field} className="bg-[#08080F] border-[#2A2A35] text-white" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="isExclusive"
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-2 space-y-0 mt-4">
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <FormLabel className="text-zinc-200">Exclusive Code</FormLabel>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="isActive"
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-2 space-y-0 mt-4">
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <FormLabel className="text-zinc-200">Active</FormLabel>
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setShowForm(false)}
                  className="border-[#2A2A35] text-zinc-300 hover:text-white hover:bg-[#2A2A35]"
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isPending} className="bg-[#00D4AA] text-[#08080F] hover:bg-[#00D4AA]/90">
                  {isPending ? "Saving..." : "Save Offer"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      )}

      {offers.length > 0 ? (
        <div className="rounded-md border border-[#2A2A35] overflow-hidden">
          <Table>
            <TableHeader className="bg-[#1A1A24]">
              <TableRow className="border-[#2A2A35] hover:bg-[#1A1A24]">
                <TableHead className="text-zinc-400">Code</TableHead>
                <TableHead className="text-zinc-400">Discount</TableHead>
                <TableHead className="text-zinc-400">Status</TableHead>
                <TableHead className="text-right text-zinc-400">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {offers.map((offer) => (
                <TableRow key={offer.id} className="border-[#2A2A35] hover:bg-[#2A2A35]/50 text-zinc-200">
                  <TableCell className="font-medium">{offer.code}</TableCell>
                  <TableCell>
                    {offer.discountPercent ? `${offer.discountPercent}%` : ""}
                    {offer.discountPercent && offer.discountAmount ? " + " : ""}
                    {offer.discountAmount ? `$${offer.discountAmount}` : ""}
                  </TableCell>
                  <TableCell>
                    {offer.isActive ? (
                      <span className="text-[#00D4AA]">Active</span>
                    ) : (
                      <span className="text-zinc-500">Inactive</span>
                    )}
                    {offer.isExclusive && <span className="ml-2 text-xs bg-purple-500/20 text-purple-400 px-2 py-0.5 rounded">Exclusive</span>}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(offer.id)}
                      className="text-red-400 hover:text-red-300 hover:bg-red-400/10 h-8 w-8 p-0"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="text-center py-8 text-zinc-500 bg-[#1A1A24] rounded-md border border-[#2A2A35]">
          No offers found for this firm.
        </div>
      )}
    </div>
  )
}

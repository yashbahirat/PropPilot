"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Firm } from "@prisma/client"
import { MoreHorizontal } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export const columns: ColumnDef<Firm>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "isActive",
    header: "Active",
    cell: ({ row }) => {
      const isActive = row.getValue("isActive")
      return (
        <span className={isActive ? "text-[#00D4AA]" : "text-zinc-500"}>
          {isActive ? "Yes" : "No"}
        </span>
      )
    },
  },
  {
    accessorKey: "isFeatured",
    header: "Featured",
    cell: ({ row }) => {
      const isFeatured = row.getValue("isFeatured")
      return isFeatured ? <span className="text-[#00D4AA]">Yes</span> : <span className="text-zinc-500">No</span>
    },
  },
  {
    accessorKey: "isVerified",
    header: "Verified",
    cell: ({ row }) => {
      const isVerified = row.getValue("isVerified")
      return isVerified ? <span className="text-[#00D4AA]">Yes</span> : <span className="text-zinc-500">No</span>
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ row }) => {
      const date = row.getValue("createdAt") as Date
      return <span>{new Date(date).toLocaleDateString()}</span>
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const firm = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-[#1A1A24] text-zinc-200 border-[#2A2A35]">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-[#2A2A35]" />
            <DropdownMenuItem className="hover:bg-[#2A2A35] hover:text-white cursor-pointer" asChild>
              <Link href={`/admin/firms/${firm.id}`}>Edit Firm</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

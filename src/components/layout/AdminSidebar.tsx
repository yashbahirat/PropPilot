"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Building2, MessageSquare, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Firms", href: "/admin/firms", icon: Building2 },
  { name: "Reviews", href: "/admin/reviews", icon: MessageSquare },
  { name: "Guides", href: "/admin/guides", icon: BookOpen },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <div className="hidden md:flex w-64 flex-col bg-[#08080F] border-r border-[#1A1A24]">
      <div className="flex h-16 items-center px-6 border-b border-[#1A1A24]">
        <Link href="/admin" className="text-xl font-bold text-white tracking-tight">
          PropPilot <span className="text-[#00D4AA]">Admin</span>
        </Link>
      </div>
      
      <div className="flex-1 py-6 px-4 space-y-1 overflow-y-auto">
        {navigation.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
          const Icon = item.icon;
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                isActive 
                  ? "bg-[#1A1A24] text-[#00D4AA]" 
                  : "text-zinc-400 hover:bg-[#1A1A24]/50 hover:text-zinc-100"
              )}
            >
              <Icon className="h-5 w-5" />
              {item.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

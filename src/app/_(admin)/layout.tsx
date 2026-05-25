import { AdminSidebar } from "@/components/layout/AdminSidebar"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex" style={{ backgroundColor: '#0E0E1A' }}>
      <AdminSidebar />
      <main id="main-content" className="flex-1 p-6 md:p-8 overflow-y-auto h-screen">
        {children}
      </main>
    </div>
  )
}

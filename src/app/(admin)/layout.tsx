export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex" style={{ backgroundColor: '#0E0E1A' }}>
      {/* Admin sidebar will be added in Phase 2 */}
      <main id="main-content" className="flex-1 p-6 md:p-8">
        {children}
      </main>
    </div>
  )
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex" style={{ backgroundColor: '#08080F' }}>
      {/* Dashboard sidebar will be added in Phase 7 */}
      <main id="main-content" className="flex-1 p-6 md:p-8">
        {children}
      </main>
    </div>
  )
}

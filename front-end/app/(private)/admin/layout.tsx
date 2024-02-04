'use client'
import AdminHeader from "@/components/admin-header/admin-header"

export default function AdminPanelLayout({
  children
}: {
  children: React.ReactNode
}) {

  return (
    <main className="h-full">
      <AdminHeader />
      {children}
    </main>
  )
}
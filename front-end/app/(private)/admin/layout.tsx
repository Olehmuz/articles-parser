'use client'
import AdminHeader from "@/components/admin-header/admin-header"
import { useRouter } from "next/navigation"


export default function AdminPanelLayout({
  children
}: {
  children: React.ReactNode
}) {
  const router = useRouter()

  return (
    <main className="h-full">
      <AdminHeader />
      {children}
    </main>
  )
}
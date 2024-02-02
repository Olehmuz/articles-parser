'use client'
import { Button } from "@/components/ui/button"
import { signOut } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/navigation"


export default function AdminPanelLayout({
  children
}: {
  children: React.ReactNode
}) {
  const router = useRouter()

  return (
    <main className="h-full">
      <div className="flex items-center w-full justify-between p-5 border-b-gray-200 border-b-[1px]">
        <Link href='/admin'>Admin panel</Link>
        <div>
          <Link href='/'><Button>Articles</Button></Link>
          <Button className='ml-2' onClick={() => signOut()}>Logout</Button>
        </div>
      </div>
      {children}
    </main>
  )
}
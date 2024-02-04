'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'
import { Button } from '../ui/button'

const Header = () => {
  const router = useRouter()
  const session = useSession()
  return (
    <header className="flex items-center w-full justify-between p-5 border-b-gray-200 border-b-[1px]">
        <div>
          Article managment system
        </div>
        <div>
          <Button onClick={() => router.push('/admin')}>Admin panel</Button>
          {session.data?.user.accessToken && <Button className='ml-2' onClick={() => signOut({ redirect: false })}>Logout</Button>}
        </div>
      </header>
  )
}

export default Header
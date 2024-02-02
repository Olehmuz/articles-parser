'use client'
import React from 'react'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'
import { signOut } from 'next-auth/react'

const Header = () => {
  const router = useRouter()
  return (
    <header className="flex items-center w-full justify-between p-5 border-b-gray-200 border-b-[1px]">
        <div>
          Article managment system
        </div>
        <div>
          <Button onClick={() => router.push('/admin')}>Admin panel</Button>
          <Button className='ml-2' onClick={() => signOut()}>Logout</Button>
        </div>
      </header>
  )
}

export default Header
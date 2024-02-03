import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'
import { signOut } from 'next-auth/react'

const AdminHeader = () => {
  return (
    <div className="flex items-center w-full justify-between p-5 border-b-gray-200 border-b-[1px]">
      <Link href='/admin'>Admin panel</Link>
      <div>
        <Link href='/'><Button>Articles</Button></Link>
        <Button className='ml-2' onClick={() => signOut()}>Logout</Button>
      </div>
    </div>
  )
}

export default AdminHeader
import React from 'react'
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card'
import Link from 'next/link'

const ArticleCard = ({ title, author, link }: { title: string, author: string, link: string }) => {
  return (
    <Link href={link} target='_blank'>
      <Card className="mt-2 max-w-[400px] h-full">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{author}</CardDescription>
        </CardHeader>
      </Card>
    </Link>

  )
}

export default ArticleCard
'use client'
import { ArticleUpdateForm } from '@/components/article-forms/article-update-form'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { getArticleById } from '@/services/articles.service'
import { useQuery } from '@tanstack/react-query'
import { Loader } from 'lucide-react'
import React from 'react'

const ArticlesUpdate = ({ params: {id} }: { params: { id: string } }) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['articles', id],
    queryFn: () => getArticleById(id)
  })

  if(isLoading) {
    return <Loader />
  }

  if(isError) {
    return <div>Some error happened.</div>
  }

  if(!data) {
    return <div>There is no article with such ID.</div>
  }

  return (
    <div className='flex w-full justify-center'>
      <Card className="mt-2 min-w-[500px]">
        <CardHeader>
          <CardTitle className="font-semibold leading-none tracking-tight">Update article</CardTitle>
        </CardHeader>
        <CardContent>
          {!isLoading && data && <ArticleUpdateForm article={data} />}
        </CardContent>
      </Card>
    </div>
  )
}

export default ArticlesUpdate
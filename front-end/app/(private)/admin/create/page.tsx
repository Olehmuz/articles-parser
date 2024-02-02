import { ArticleCreateForm } from '@/components/article-forms/article-create-form'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import React from 'react'

const ArticlesCreate = () => {

  return (
    <div className='flex w-full justify-center'>
      <Card className="mt-2 min-w-[500px]">
        <CardHeader>
          <CardTitle className="font-semibold leading-none tracking-tight">Create article</CardTitle>
        </CardHeader>
        <CardContent>
          <ArticleCreateForm />
        </CardContent>
      </Card>
    </div>
  )
}

export default ArticlesCreate
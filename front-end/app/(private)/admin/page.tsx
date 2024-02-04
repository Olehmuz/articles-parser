'use client'
import React from 'react'
import { ArticleTable } from '@/components/articles-table/articles-table'

const Articles = () => {

  return (
    <section className="flex min-h-screen flex-col p-5 flex-auto">
      <ArticleTable />
    </section>
  )
}

export default Articles
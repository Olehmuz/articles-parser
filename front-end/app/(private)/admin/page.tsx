'use client'
import { ArticleTable } from '@/components/articles-table/articles-table'
import React from 'react'

const Articles = () => {

  return (
    <section className="flex min-h-screen flex-col p-5 flex-auto">
      <ArticleTable />
    </section>
  )
}

export default Articles
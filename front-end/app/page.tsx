'use client'
import ArticleCard from "@/components/article-card/article-card";
import Header from "@/components/header/header";
import { PaginationDemo } from "@/components/pagination/pagination";
import { Input } from "@/components/ui/input";

import { getArticlesList } from "@/services/articles.service";
import { useQuery } from "@tanstack/react-query";
import { PaginationState } from "@tanstack/react-table";
import { useEffect, useState } from "react";

export default function Home() {
  const [search, setSearch] = useState<string>("");

  const [{ pageIndex, pageSize }, setPagination] =
  useState<PaginationState>({
    pageIndex: 0,
    pageSize: 9,
  })

  useEffect(() => {
    setPagination({ pageIndex: 0, pageSize: 9 });
  }, [search]);

  const fetchDataOptions = {
    pageIndex,
    pageSize,
  }

  const { data, isLoading } = useQuery({
    queryKey: ["articles", fetchDataOptions, search],
    queryFn: () => getArticlesList(fetchDataOptions, search),
  });

  return (
    <main className="flex min-h-screen flex-col items-center">
      <Header />
      <div className="flex-auto">
        <div className="flex justify-center mt-4"><Input placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} className='max-w-[400px]' /></div>
        <div className="grid grid-cols-3 gap-4 mt-[32px]">
          {!isLoading && data && data.data.map((article) => (<ArticleCard key={article.id} title={article.title} author={article.author} link={article.link} />))}
        </div>
      </div>
      
      <div className="min-h-[100px]">
        {!isLoading && data && <PaginationDemo pageIndex={pageIndex} pageSize={pageSize} totalPage={data.totalPages} setPagination={setPagination} />}
      </div>
    </main>
  );
}

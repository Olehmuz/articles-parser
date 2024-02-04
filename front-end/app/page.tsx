'use client'
import { useQuery } from "@tanstack/react-query";
import { PaginationState } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import ArticleCard from "@/components/article-card/article-card";
import Header from "@/components/header/header";
import { PaginationDemo } from "@/components/pagination/pagination";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/useDebounce";

import { getArticlesList } from "@/services/articles.service";

export default function Home() {

  const [search, setSearch] = useState<string>("");
  const debouncedSearch = useDebounce(search, 300);

  const [{ pageIndex, pageSize }, setPagination] =
  useState<PaginationState>({
    pageIndex: 0,
    pageSize: 9,
  })

  useEffect(() => {
    setPagination({ pageIndex: 0, pageSize: 9 })
  }, [debouncedSearch]);


  const fetchDataOptions = {
    pageIndex,
    pageSize,
  }

  const { data, isLoading } = useQuery({
    queryKey: ["articles", fetchDataOptions, debouncedSearch],
    queryFn: () => getArticlesList(fetchDataOptions, debouncedSearch),
  });

  return (
    <main className="flex min-h-screen flex-col items-center">
      <Header />
      <div className="flex-auto">
        <div className="flex justify-center mt-4 w-full"><Input placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} className='w-[400px]' /></div>
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

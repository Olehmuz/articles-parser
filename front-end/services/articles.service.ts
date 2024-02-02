
import { $axios } from "@/lib/axios.base";
import { Article, CreateArticle, UpdateArticle } from "@/models/article.model";
import { PaginationState } from "@tanstack/react-table";

type ArticleResponse = {data: Article[], currentPage: number, totalPages: number}

export const createArticle = async (article: CreateArticle): Promise<Article> => {
  const { data } = await $axios.post<Article>(`${process.env.NEXT_PUBLIC_baseURL}/articles`, article);
  return data;
}

export const updateArticle = async (id: string, article: UpdateArticle): Promise<Article> => {
  const { data } = await $axios.patch<Article>(`${process.env.NEXT_PUBLIC_baseURL}/articles/${id}`, article);
  return data;
}


export const getArticleById = async (id: string): Promise<Article> => {
  const { data } = await $axios.get<Article>(`${process.env.NEXT_PUBLIC_baseURL}/articles/${id}`);
  return data;
}

export const deleteArticle = async (id: string): Promise<Article> => {
  const { data } = await $axios.delete<Article>(`${process.env.NEXT_PUBLIC_baseURL}/articles/${id}`);
  return data;
}

export const getArticlesList = async ({pageIndex, pageSize}: PaginationState, search: string=''): Promise<ArticleResponse> => {
  const queryPrams = new URLSearchParams({page: (pageIndex+1).toString(), limit: pageSize.toString(), search: search}).toString();
  const { data } = await $axios.get<ArticleResponse>(`${process.env.NEXT_PUBLIC_baseURL}/articles?${queryPrams}`);
  return data;
}


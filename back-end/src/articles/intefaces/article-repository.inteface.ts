import { type Article } from '@prisma/client'
import { type CreateArticleDto } from '../dto/create-article.dto'
import { type UpdateArticleDto } from '../dto/update-article.dto'
import { type IPaginationOptions } from '../../core/common/pagination.intefaces'

export interface IArticlesRepository {
  createArticle: (dto: CreateArticleDto) => Promise<Article>
  updateArticle: (id: string, dto: UpdateArticleDto) => Promise<Article>
  deleteArticle: (id: string) => Promise<Article>
  findArticleById: (id: string) => Promise<Article | null>
  getArticlesList: ({ page, limit }: IPaginationOptions, search: string) => Promise<Article[] | null>
  findArticleByFilter: (filter: any) => Promise<Article | null>
  countArticles: (filter?: any) => Promise<number>
}

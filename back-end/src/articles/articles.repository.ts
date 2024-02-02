import { type Article } from '@prisma/client'
import { type DatabaseService } from '../core/common/database/database.service'
import { type IPaginationOptions } from '../core/common/pagination.intefaces'
import { type CreateArticleDto } from './dto/create-article.dto'
import { type IArticlesRepository } from './intefaces/article-repository.inteface'
import { type UpdateArticleDto } from './dto/update-article.dto'

export class ArticlesRepository implements IArticlesRepository {
  constructor (private readonly db: DatabaseService) {}

  async createArticle (dto: CreateArticleDto): Promise<Article> {
    return await this.db.client.article.create({ data: dto })
  }

  async updateArticle (id: string, dto: UpdateArticleDto): Promise<Article> {
    return await this.db.client.article.update({ where: { id }, data: dto })
  }

  async deleteArticle (id: string): Promise<Article> {
    return await this.db.client.article.delete({ where: { id } })
  }

  async findArticleByFilter (filter: any): Promise<Article | null> {
    return await this.db.client.article.findFirst({ where: filter })
  }

  async findArticleById (id: string): Promise<Article | null> {
    return await this.db.client.article.findFirst({ where: { id } })
  }

  async getArticlesList ({ page, limit }: IPaginationOptions, search: string): Promise<Article[] | null> {
    return await this.db.client.article.findMany({
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: 'desc' },
      where: {
        title: {
          contains: search,
          mode: 'insensitive'
        }
      }
    })
  }

  async countArticles (filter: any): Promise<number> {
    return await this.db.client.article.count({
      where: filter
    })
  }
}

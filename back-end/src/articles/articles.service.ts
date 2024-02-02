import { type Article } from '@prisma/client'
import { type IPaginationOptions } from '../core/common/pagination.intefaces'
import { type CreateArticleDto } from './dto/create-article.dto'
import { type IArticlesRepository } from './intefaces/article-repository.inteface'
import { type IArticlesService } from './intefaces/article-service.inteface'
import { type UpdateArticleDto } from './dto/update-article.dto'
import { type ArticlesWithPagination } from './intefaces/article-with-pagination.type'

export class ArticlesService implements IArticlesService {
  constructor (private readonly articlesRepository: IArticlesRepository) {}

  async createArticle (dto: CreateArticleDto): Promise<Article> {
    return await this.articlesRepository.createArticle(dto)
  }

  async getArticlesList ({ page, limit }: IPaginationOptions, search: string): Promise<ArticlesWithPagination> {
    const articlesPromise = this.articlesRepository.getArticlesList({ page, limit }, search)
    const totalCountPromise = this.articlesRepository.countArticles({
      content: {
        contains: search,
        mode: 'insensitive'
      }
    })
    const [articles, totalCount] = await Promise.all([articlesPromise, totalCountPromise])

    return {
      data: articles ?? [],
      currentPage: page,
      totalPages: Math.ceil(totalCount / limit),
      limit
    }
  }

  async findArticleById (id: string): Promise<Article | null> {
    return await this.articlesRepository.findArticleById(id)
  }

  async findArticleByFilter (filter: any): Promise<Article | null> {
    return await this.articlesRepository.findArticleByFilter(filter)
  }

  async updateArticle (id: string, dto: UpdateArticleDto): Promise<Article> {
    return await this.articlesRepository.updateArticle(id, dto)
  }

  async deleteArticle (id: string): Promise<Article> {
    return await this.articlesRepository.deleteArticle(id)
  }
}

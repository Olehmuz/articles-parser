import { type NextFunction, type Request, type Response } from 'express'

import Parser from 'rss-parser'
import { Roles } from '@prisma/client'
import { NotFoundException } from '../core/common/errors/exceptions/not-found.exception'
import { ValidatorMiddleware } from '../core/common/middlewares/validation.middleware'

import { BaseController } from '../core/common/base.controller'
import { type ILoggerService } from '../core/logger/logger.inteface'
import { type IPaginationOptions } from '../core/common/pagination.intefaces'
import { AuthMiddleware } from '../core/common/middlewares/authorization.middleware'
import { RoleGuard } from '../core/common/middlewares/role.quard'
import { type IArticlesService } from './intefaces/article-service.inteface'
import { type CreateArticleDto, CreateArticleDtoSchema } from './dto/create-article.dto'
import { type UpdateArticleDto, UpdateArticleDtoSchema } from './dto/update-article.dto'

export class ArticlesController extends BaseController {
  constructor (
    public readonly prefix: string,
    private readonly loggerService: ILoggerService,
    private readonly articlesService: IArticlesService
  ) {
    super(prefix, loggerService)
    this.bindRoutes([
      {
        path: '',
        func: this.createArticle,
        method: 'post',
        middlewares: [new AuthMiddleware(), new RoleGuard(Roles.ADMIN), new ValidatorMiddleware(CreateArticleDtoSchema)]
      },
      {
        path: '',
        func: this.getArticlesList,
        method: 'get'
      },
      {
        path: '/:id',
        func: this.findArticleById,
        method: 'get'
      },
      {
        path: '/:id',
        func: this.deleteArticle,
        method: 'delete',
        middlewares: [new AuthMiddleware(), new RoleGuard(Roles.ADMIN)]
      },
      {
        path: '/:id',
        func: this.updateArticle,
        method: 'patch',
        middlewares: [new AuthMiddleware(), new RoleGuard(Roles.ADMIN), new ValidatorMiddleware(UpdateArticleDtoSchema)]
      }
    ], prefix)
  }

  async createArticle (req: Request<{}, {}, CreateArticleDto>, res: Response): Promise<void> {
    const dto = req.body
    const article = await this.articlesService.createArticle(dto)
    res.status(200).send(article)
  }

  async updateArticle (req: Request<{ id: string }, {}, UpdateArticleDto>, res: Response, next: NextFunction): Promise<void> {
    const id = req.params.id
    const dto = req.body
    const existedArticle = await this.articlesService.findArticleById(id)

    if (!existedArticle) {
      next(new NotFoundException("Article with such ID doesn't exists."))
      return
    }

    const article = await this.articlesService.updateArticle(id, dto)
    res.status(200).send(article)
  }

  async getArticlesList (req: Request<{}, {}, IPaginationOptions & { search: string }>, res: Response): Promise<void> {
    const page = req.query.page ? +req.query.page : 1
    const limit = req.query.limit ? +req.query.limit : 30
    let search = ''
    if (typeof req.query.search === 'string') search = req.query.search

    const articles = await this.articlesService.getArticlesList({ page, limit }, search)
    res.status(200).send(articles)
  }

  async findArticleById (req: Request<{ id: string }>, res: Response, next: NextFunction): Promise<void> {
    const id = req.params.id
    const articles = await this.articlesService.findArticleById(id)
    if (!articles) {
      next(new NotFoundException('No article found with such ID.'))
      return
    }
    res.status(200).send(articles)
  }

  async deleteArticle (req: Request<{ id: string }>, res: Response, next: NextFunction): Promise<void> {
    const id = req.params.id
    const existedArticle = await this.articlesService.findArticleById(id)

    if (!existedArticle) {
      next(new NotFoundException("Article with such ID doesn't exists."))
      return
    }

    const deletedArticle = await this.articlesService.deleteArticle(id)

    res.status(200).send(deletedArticle)
  }
}

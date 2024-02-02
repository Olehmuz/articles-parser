import Parser, { type Item } from 'rss-parser'
import moment from 'moment'
import { type IArticlesService } from '../articles/intefaces/article-service.inteface'
import { type CreateArticleDto } from '../articles/dto/create-article.dto'
import { type ILoggerService } from '../core/logger/logger.inteface'
import { type IParserService } from './intefaces/parser-service.inteface'

export class ParserService implements IParserService {
  private readonly rssLinks: string[]
  private readonly parser = new Parser()
  constructor (private readonly logger: ILoggerService, private readonly articlesService: IArticlesService) {
    if (!process.env.RSS_LINKS) {
      this.logger.error('[PARSER SERVICE] RSS_LINKS env variable is not defined')
      throw new Error('RSS_LINKS env variable is not defined')
    }
    this.rssLinks = process.env.RSS_LINKS.split(',')
  }

  validateArticle (article: Item): CreateArticleDto {
    if (!article.guid || !article.title || !article.link || !article.content || !article.isoDate || !article.creator) {
      throw new Error('Unsupported article structure')
    }
    const createdAt = moment(article.isoDate).toDate()
    return {
      articleId: article.guid,
      title: article.title,
      link: article.link,
      createdAt,
      author: article.creator,
      content: article.content
    }
  }

  async fetchArticles (): Promise<Item[]> {
    try {
      const promises = this.rssLinks.map((link) => this.parser.parseURL(link))
      const results = await Promise.all(promises)
      return results.flatMap((result) => result.items)
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error(`[EXCEPTION] message: ${error.message}]`)
      }
      return []
    }
  }

  async parseArticles (): Promise<void> {
    try {
      const fetchedArticles = await this.fetchArticles()
      const articles = fetchedArticles.map(this.validateArticle)
      if (!articles.length) {
        return
      }
      for (const article of articles) {
        if (!article.articleId) {
          continue
        }
        const existedArticle = await this.articlesService.findArticleByFilter({ articleId: article.articleId })
        if (existedArticle) continue
        await this.articlesService.createArticle(article)
        this.logger.info(`[PARSER SERVICE] Article ${article.articleId} was created`)
      }
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error(`[EXCEPTION] message: ${error.message}]`)
      }
    }
  }
}

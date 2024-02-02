import { DependencyModule, injected } from 'brandi'
import { TOKENS } from '../core/container/tokens'
import { ArticlesController } from './articles.controller'
import { ArticlesRepository } from './articles.repository'
import { ArticlesService } from './articles.service'

export const ArticlesModule = new DependencyModule()

ArticlesModule.bind(TOKENS.articlesController).toInstance(ArticlesController).inContainerScope()
ArticlesModule.bind(TOKENS.articlesRepository).toInstance(ArticlesRepository).inContainerScope()
ArticlesModule.bind(TOKENS.articlesService).toInstance(ArticlesService).inContainerScope()
ArticlesModule.bind(TOKENS.articlesPrefix).toConstant('articles')

injected(ArticlesRepository, TOKENS.databaseService)
injected(ArticlesService, TOKENS.articlesRepository)
injected(ArticlesController, TOKENS.articlesPrefix, TOKENS.loggerService, TOKENS.articlesService)

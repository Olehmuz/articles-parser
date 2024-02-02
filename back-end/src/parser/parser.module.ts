import { DependencyModule, injected } from 'brandi'
import { TOKENS } from '../core/container/tokens'
import { ArticlesModule } from '../articles/articles.module'
import { ParserService } from './parser.service'

export const ParserModule = new DependencyModule()

ParserModule.use(TOKENS.articlesService).from(ArticlesModule)

ParserModule.bind(TOKENS.parserService).toInstance(ParserService).inContainerScope()

injected(ParserService, TOKENS.loggerService, TOKENS.articlesService)

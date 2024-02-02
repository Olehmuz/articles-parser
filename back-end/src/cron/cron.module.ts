import { DependencyModule, injected } from 'brandi'
import { TOKENS } from '../core/container/tokens'
import { ParserModule } from '../parser/parser.module'
import { CronService } from './cron.service'

export const CronModule = new DependencyModule()

CronModule.use(TOKENS.parserService).from(ParserModule)

CronModule.bind(TOKENS.cronService).toInstance(CronService).inContainerScope()

injected(CronService, TOKENS.loggerService, TOKENS.parserService)

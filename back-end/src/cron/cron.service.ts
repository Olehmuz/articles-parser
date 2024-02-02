import { CronJob } from 'cron'
import { type IParserService } from '../parser/intefaces/parser-service.inteface'
import { type ILoggerService } from '../core/logger/logger.inteface'
import { type ICronService } from './intefaces/cron-service.inteface'
import { CronExpressions } from './cron-expression.enum'

export class CronService implements ICronService {
  constructor (private readonly logger: ILoggerService, private readonly parserService: IParserService) {}

  async runCronJobs (): Promise<void> {
    await this.parseArticles()
  }

  async parseArticles (): Promise<void> {
    const ParseJob = new CronJob(CronExpressions.EVERY_10_MINUTES, async () => {
      this.logger.info('[CRON SERVICE] Parsing articles...')
      await this.parserService.parseArticles()
    })
    ParseJob.start()
  }
}

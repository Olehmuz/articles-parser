import { token } from 'brandi'
import { type App } from '../app'

import { type BaseController } from '../common/base.controller'
import { type IDBService } from '../common/database/database.inteface'
import { type IException } from '../common/errors/exception-filter.inteface'
import { type IConfigService } from '../config/config-service.interface'
import { type ILoggerService } from '../logger/logger.inteface'
import { type IUsersRepository } from '../../users/intefaces/users-repository.inteface'
import { type IUsersService } from '../../users/intefaces/users-service.inteface'
import { type IAuthService } from '../../auth/intefaces/auth-service.inteface'
import { type IJWTService } from '../../auth/intefaces/jwt-service.inteface'
import { type IParserService } from '../../parser/intefaces/parser-service.inteface'
import { type IArticlesRepository } from '../../articles/intefaces/article-repository.inteface'
import { type IArticlesService } from '../../articles/intefaces/article-service.inteface'
import { type ICronService } from '../../cron/intefaces/cron-service.inteface'

export const TOKENS = {
  app: token<App>('app'),
  loggerService: token<ILoggerService>('loggerService'),
  configService: token<IConfigService>('configService'),
  exceptionFilter: token<IException>('exception'),
  databaseService: token<IDBService>('databaseService'),
  usersPrefix: token<string>('usersPrefix'),
  usersRepository: token<IUsersRepository>('usersRepository'),
  usersController: token<BaseController>('usersController'),
  usersService: token<IUsersService>('usersService'),
  authPrefix: token<string>('authPrefix'),
  authController: token<BaseController>('authController'),
  authService: token<IAuthService>('authService'),
  jwtService: token<IJWTService>('jwtService'),
  parserService: token<IParserService>('parserService'),
  rssLinks: token<string[]>('rssLinks'),
  cronService: token<ICronService>('cronService'),
  articlesPrefix: token<string>('articlesPrefix'),
  articlesRepository: token<IArticlesRepository>('articlesRepository'),
  articlesController: token<BaseController>('articlesController'),
  articlesService: token<IArticlesService>('articlesService')
}

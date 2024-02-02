import { type Request, type Response, type NextFunction } from 'express'
import { verify } from 'jsonwebtoken'
import { Roles } from '@prisma/client'
import { UnauthorizedException } from '../errors/exceptions/unauthorized.exception'
import { HttpError } from '../errors/http.error'
import { ForbiddenException } from '../errors/exceptions/forbiden.exception'
import { type IMiddleware } from './middleware.inteface'

export class RoleGuard implements IMiddleware {
  constructor (private readonly role: Roles) {}
  execute (
    req: Request,
    res: Response,
    next: NextFunction
  ): void {
    if (req.user.role === Roles.ADMIN) {
      next()
      return
    }
    if (req.user.role !== this.role) {
      next(new ForbiddenException('Access denied. Required role: ' + this.role))
      return
    }
    next()
  }
}

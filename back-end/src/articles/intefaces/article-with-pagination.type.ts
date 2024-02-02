import { type Article } from '@prisma/client'
import { type IPaginationOutput } from '../../core/common/pagination.intefaces'

export type ArticlesWithPagination = {
  data: Article[] | []
} & IPaginationOutput & { limit: number }

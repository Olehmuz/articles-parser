import { z } from 'zod'

export const CreateArticleDtoSchema = z.object({
  body: z.object({
    articleId: z.string().optional(),
    createdAt: z.date().optional(),
    title: z.string().min(1, "Title can't be empty"),
    content: z.string().min(1, "Content can't be empty"),
    link: z.string().min(1, "Link can't be empty"),
    author: z.string().min(1, "Author can't be empty")
  })
})

export type CreateArticleDto = z.infer<typeof CreateArticleDtoSchema['shape']['body']>

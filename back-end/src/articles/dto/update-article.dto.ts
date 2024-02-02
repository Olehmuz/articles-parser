import { z } from 'zod'

export const UpdateArticleDtoSchema = z.object({
  body: z.object({
    title: z.string().min(1, "Title can't be empty").optional(),
    content: z.string().min(1, "Content can't be empty").optional(),
    link: z.string().min(1, "Link can't be empty").optional(),
    author: z.string().min(1, "Author can't be empty").optional()
  })
})

export type UpdateArticleDto = z.infer<typeof UpdateArticleDtoSchema['shape']['body']>

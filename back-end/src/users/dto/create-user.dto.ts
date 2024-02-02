import { z } from 'zod'
import { Roles } from '@prisma/client'

export const CreateUserDtoSchema = z.object({
  body: z.object({
    email: z.string().email(),
    name: z.string().optional(),
    hashedPassword: z.string(),
    role: z.enum([Roles.USER, Roles.ADMIN]).optional()
  })
})

export type CreateUserDto = z.infer<typeof CreateUserDtoSchema['shape']['body']>

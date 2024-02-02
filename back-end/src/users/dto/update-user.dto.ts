import { Roles } from '@prisma/client'
import { z } from 'zod'

export const UpdateUserDtoSchema = z.object({
  body: z.object({
    email: z.string().email().optional(),
    name: z.string().optional(),
    hashedPassword: z.string().optional(),
    role: z.enum([Roles.USER, Roles.ADMIN]).optional()
  })
})

export type UpdateUserDto = z.infer<typeof UpdateUserDtoSchema['shape']['body']>

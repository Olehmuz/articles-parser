import { Roles } from '@prisma/client'
import { z } from 'zod'

export const RegisterUserDtoSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(8),
    role: z.enum([Roles.ADMIN, Roles.USER]).optional()
  })
})

export type RegisterUserDto = z.infer<typeof RegisterUserDtoSchema['shape']['body']>

import { z } from 'zod'

export const accountSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email harus diisi' })
    .email({ message: 'Email tidak valid' }),
  first_name: z
    .string()
    .min(1, { message: 'Nama depan harus diisi' }),
  last_name: z
    .string()
    .min(1, { message: 'Nama belakang harus diisi' }),
})

export type AccountForm = z.infer<typeof accountSchema>
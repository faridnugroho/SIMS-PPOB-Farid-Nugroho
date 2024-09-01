import { z } from 'zod'

export const registerSchema = z.object({
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
  password: z
    .string()
    .min(1, { message: 'Password harus diisi' })
    .min(8, { message: 'Password minimal 8 karakter' }),
  confirmPassword: z
    .string()
    .min(1, { message: 'Konfirmasi password harus diisi' }),
}).refine(data => data.password === data.confirmPassword, {
  path: ['confirmPassword'],
  message: 'password tidak sama',
})

export type RegisterForm = z.infer<typeof registerSchema>
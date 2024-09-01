import { z } from 'zod'

export const topupSchema = z.object({
  top_up_amount: z
    .string()
    .min(0, { message: 'Top up amount cannot be less than 0' })
});

export type TopupForm = z.infer<typeof topupSchema>
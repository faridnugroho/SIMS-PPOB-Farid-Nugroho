import { z } from 'zod'

export const topupSchema = z.object({
  top_up_amount: z
    .string()
    .min(0, { message: 'Top up amount cannot be less than 0' })
    .refine((value) => {
      const numericValue = parseFloat(value.replace(/[^0-9]/g, ''));
      return numericValue >= 10000;
    }, {
      message: 'Top up amount must be at least Rp10.000',
    })
    .refine((value) => {
      const numericValue = parseFloat(value.replace(/[^0-9]/g, ''));
      return numericValue <= 1000000;
    }, {
      message: 'Top up amount must not exceed Rp1.000.000',
    }),
  transaction_type: z
    .string()
    .min(1, { message: 'Transaction type is required' })
});

export type TopupForm = z.infer<typeof topupSchema>
import { z } from 'zod'

export const purchaseSchema = z.object({
  total_amount: z
    .string()
    .min(0, { message: 'Total amount cannot be less than 0' }),
  service_code: z
    .string()
    .min(1, { message: 'Service code is required' }),
  transaction_type: z
    .string()
    .min(1, { message: 'Transaction type is required' })
});

export type PurchaseForm = z.infer<typeof purchaseSchema>
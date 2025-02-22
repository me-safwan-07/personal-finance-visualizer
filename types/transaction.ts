import { z } from "zod";

// Transaction Types
export const ZTransactionType = z.enum(['expense', 'income']);
export type TTransactionType = z.infer<typeof ZTransactionType>;

export const ZTransactionCategory = z.enum(['Food', 'Transport', 'Housing', 'Utilities', 'Entertainment', 'Shopping', 'Healthcare', 'Other']);
export type TTransactionCategory = z.infer<typeof ZTransactionCategory>;

export const ZStage = z.enum(['pending', 'in_progress', 'completed']);
export type TStage = z.infer<typeof ZStage>;

export const Ztransaction = z.object({
  _id: z.string(),
  amount: z.number(),
  description: z.string(),
  date: z.date(),
  category: ZTransactionCategory,
  type: ZTransactionType,
  createdAt: z.date(),
  updatedAt: z.date(),
  stage: z.string(),
});
export type TTransaction = z.infer<typeof Ztransaction>;

// Form Types
export const ZTransactionFormData = z.object({
  amount: z.number().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: 'Amount must be a positive number',
  }),
  description: z.string().min(3, {
    message: 'Description must be at least 3 characters.',
  }),
  date: z.date({
    required_error: 'Please select a date.',
  }),
  category: ZTransactionCategory,
  type: ZTransactionType,
  stage: ZStage,
});
export type TTransactionFormData = z.infer<typeof ZTransactionFormData>;

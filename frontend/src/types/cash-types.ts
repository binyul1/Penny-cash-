import { z } from "zod";

export const expenseSchema = z.object({
  title: z.string().trim().min(3, "Title must be at least 3 characters"),
  amount: z
    .string()
    .trim()
    .min(1, "Amount is required")
    .refine((value) => !Number.isNaN(Number(value)), "Amount must be a number")
    .refine((value) => Number(value) > 0, "Amount must be greater than zero"),
  date: z.string().trim().min(1, "Date is required"),
  category: z.enum(["Office Supplies", "Grocery", "Toiletries", "Transport"]),
  notes: z.string().trim().min(3, "Notes must be at least 3 characters"),
  image: z.any().optional(),
});

export type ExpenseFormValues = z.infer<typeof expenseSchema>;

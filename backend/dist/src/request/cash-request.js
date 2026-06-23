import z from "zod";
export const CashRequestSchema = z.object({
    title: z.string().min(3),
    amount: z.coerce.number().positive("Amount must be greater than 0"),
    date: z.string().min(1).optional(),
    notes: z.string().min(3),
    category: z.enum(["Office Supplies", "Grocery", "Toiletries", "Transport"]),
});
export const CashRequestStatusUpdateSchema = z.object({
    status: z.enum(["pending", "approved", "rejected"]),
});
//# sourceMappingURL=cash-request.js.map
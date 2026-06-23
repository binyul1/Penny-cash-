import z from "zod";
export const CashWithdrawSchema = z.object({
    amount: z.coerce.number().positive("Amount must be greater than 0"),
    description: z.string().trim().max(200).optional().default(""),
});
//# sourceMappingURL=cash-withdraw-request.js.map
import z from "zod";

export const CashRequestSchema = z.object({
    title: z.string().min(3),
    amount: z.coerce.number().positive("Amount must be greater than 0"),
    notes: z.string().min(3),
    category: z.enum(["Office Supplies", "Grocery", "Toiletries","Transport"]),
})

export const CashRequestStatusUpdateSchema = z.object({
    status: z.enum(["pending", "approved", "rejected"]),
})

export type ICashRequestStatusUpdate = z.infer<typeof CashRequestStatusUpdateSchema>;

export type ICashRequestImage = {
    originalName: string;
    filename: string;
    size: number;
    destination: string;
};

export type ICashRequest = z.infer<typeof CashRequestSchema> & {
    createdBy: string;
    image?: ICashRequestImage;
};
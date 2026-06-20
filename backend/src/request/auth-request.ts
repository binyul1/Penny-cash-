import z from "zod";

export const LoginSchema = z.object({
    username: z.string().nonempty().nonoptional(),
    password: z.string().nonempty().nonoptional()
})
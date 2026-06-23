import z from "zod";
export const LoginSchema = z.object({
    username: z.string().nonempty().nonoptional(),
    password: z.string().nonempty().nonoptional()
});
export const UserRegisterSchema = z.object({
    name: z.string().min(3).max(20).nonempty("Name is required"),
    email: z.email().nonempty("Email is required"),
    username: z.string().nonempty("Username is required").min(3).max(20),
    password: z
        .string()
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[\d\\0-9])(?=.*[\W-_]).{8,25}$/, "Password does not follow strong password rule."),
    confirmPassword: z.string().nonempty(),
})
    .refine((data) => data.password === data.confirmPassword, {
    message: "Password and Confirm Password must match",
    path: ["confirmPassword"],
});
//# sourceMappingURL=auth-request.js.map
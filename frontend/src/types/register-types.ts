import z from "zod";

export const registerDTO = z
  .object({
    name: z
      .string()
      .min(3, "Name must be at least 3 characters")
      .max(20, "Name must be at most 20 characters"),
    email: z.string().email("Email is required"),
    username: z
      .string()
      .min(3, "Username must be at least 3 characters")
      .max(20, "Username must be at most 20 characters"),
    password: z
      .string()
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\d\0-9])(?=.*[\W-_]).{8,25}$/,
        "Password does not follow strong password rule.",
      ),
    confirmPassword: z.string().min(1, "Confirm password is required"),
    image: z.any().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password and Confirm Password must match",
    path: ["confirmPassword"],
  });

export type RegisterFormValues = z.infer<typeof registerDTO>;

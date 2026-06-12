import z from "zod";

export interface ICredentials {
  username: string;
  password: string;
}

export const loginDTO = z.object({
  username: z.string().nonempty("Username is required"),
  password: z.string().min(8, "Password must have atleast 8 characters"),
});
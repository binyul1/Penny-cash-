import z from "zod";

export interface ICredentials {
  username: string;
  password: string;
}

export const loginDTO = z.object({
  username: z.string().nonempty("Username is required"),
  password: z.string().min(8, "Password must have atleast 8 characters"),
});

export interface ILoginResponse {
  accessToken: string;
  refreshToken: string;
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  gender: string;
  image: string;
  id: number;
}

export const loginResponseDTO = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  username: z.string(),
  gender: z.string(),
  image: z.string().url(),
  id: z.number(),
});

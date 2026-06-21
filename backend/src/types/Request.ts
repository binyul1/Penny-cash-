import type { Request } from "express";

export interface IUserDetail {
  image?: string | null;
  _id: string;
  name: string;
  email: string;
  username: string;
  role: string;
}
export interface AuthRequest extends Request {
  loggedInUser?: IUserDetail;
}

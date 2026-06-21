import { createContext } from "react";
import type { ICredentials, IUserDetail } from "../types/auth-types";

export interface IAuthContext {
  loggedInUser: null | IUserDetail;
  login: (credentials: ICredentials) => Promise<IUserDetail | null>;
  getLoggedInUser: () => Promise<IUserDetail | null>;
  logout: () => void;
}

const AuthContext = createContext<IAuthContext>({
  loggedInUser: null,
  async login() {
    return null;
  },
  async getLoggedInUser() {
    return null;
  },
  logout() {},
});

export default AuthContext;

import { createContext } from "react";
import type { ICredentials, IUserDetail } from "../types/auth-types";

export interface IAuthContext {
  loggedInUser: null | IUserDetail;
  login: (credentials: ICredentials) => Promise<void | IUserDetail>;
  getLoggedInUser: () => Promise<void | IUserDetail>;
  logout: () => void;
}

const AuthContext = createContext<IAuthContext>({
  loggedInUser: null,
  async login() {},
  async getLoggedInUser() {},
  logout() {},
});

export default AuthContext;

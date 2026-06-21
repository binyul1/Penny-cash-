import { useEffect, useState, type ReactNode } from "react";
import AuthContext from "../../contex/AuthContext";
import type { ICredentials, IUserDetail } from "../../types/auth-types";
import axiosInstance from "../../config/apiClient";
import Cookies from "js-cookie";

const AuthProvider = ({ children }: Readonly<{ children: ReactNode }>) => {
  const [loggedInUser, setLoggedInUser] = useState<null | IUserDetail>(null);
  const [loading, setLoading] = useState<boolean>(true);
  //define the states or actions
  const login = async (credentials: ICredentials) => {
    try {
      const response = (await axiosInstance.post(
        "/auth/login",
        credentials,
      )) as string;

      Cookies.set("authToken", response, {
        expires: 1,
        secure: true,
        sameSite: "lax",
      });

      const userDetail = await getLoggedInUser();
      return userDetail;
    } catch (exceptation) {
      console.log(exceptation);
      return null;
    }
  };
  const getLoggedInUser = async () => {
    try {
      const response = (await axiosInstance.get("/auth/me")) as IUserDetail;
      setLoggedInUser(response);
      return response;
    } catch (exceptation) {
      console.log(exceptation);
      setLoggedInUser(null);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    Cookies.remove("authToken", { path: "/" });
    setLoggedInUser(null);
  };

  useEffect(() => {
    const token = Cookies.get("authToken");
    if (token) {
      getLoggedInUser();
    } else {
      setTimeout(() => {
        setLoading(false);
      }, 0);
    }
  }, []);

  return loading ? (
    <>loading... </>
  ) : (
    <AuthContext.Provider
      value={{
        loggedInUser: loggedInUser,
        login: login,
        getLoggedInUser: getLoggedInUser,
        logout: logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

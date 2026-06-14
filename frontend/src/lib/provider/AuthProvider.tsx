import { useState, type ReactNode } from "react";
import AuthContext from "../../contex/AuthContext";
import type { ICredentials, ILoginResponse, IUserDetail } from "../../types/auth-types";
import axiosInstance from "../../config/apiClient";
import Cookies from "js-cookie";

const AuthProvider = ({ children }: Readonly<{ children: ReactNode }>) => {
    const [loggedInUser, setLoggedInUser] = useState<null|IUserDetail>(null)
    //define the states or actions
    const login = async (credentials: ICredentials) =>{
        try{
            const response = await axiosInstance.post("/auth/login", credentials) as ILoginResponse;
            Cookies.set("authToken", response.accessToken,{expires:1, secure:true, sameSite:"lax"});
            Cookies.set("refreshToken", response.refreshToken,{expires:1, secure:true, sameSite:"lax"});

            const userDetail = await getLoggedInUser()
            return userDetail
        }catch(exceptation){
            console.log(exceptation)
        }
    }
    const getLoggedInUser = async() =>{
        try {
            const response = await axiosInstance.get("/auth/me") as IUserDetail
            setLoggedInUser(response)
            return response;
        } catch (exceptation) {
            console.log(exceptation)
        }
    }
  return (
    <AuthContext.Provider
      value={{
        loggedInUser: loggedInUser,
        login: login,
        getLoggedInUser: getLoggedInUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider
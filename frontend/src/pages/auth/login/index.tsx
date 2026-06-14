import { Link } from "react-router-dom";
import AuthPageShell from "../../../components/auth/AuthShell";
import AuthPromoPanel from "../../../components/auth/AuthPromoPanel";
import { useForm } from "react-hook-form";
import { SubmitButton } from "../../../components/buttons/Button";
import { loginDTO, type ICredentials, type ILoginResponse } from "../../../types/auth-types";
import { InputText } from "../../../components/form/InputText";
import { zodResolver } from "@hookform/resolvers/zod";
import axiosInstance from "../../../config/apiClient";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Cookies from "js-cookie";

export default function Login() {
  const navigate = useNavigate();
  // using hook form
  const {control,handleSubmit,formState: { errors }} = useForm<ICredentials>({
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: zodResolver(loginDTO),
  });
  const submitForm = async (data: ICredentials) => {
    try {
      const loginResponse = await axiosInstance.post("/auth/login", data) as ILoginResponse;
      Cookies.set("authToken", loginResponse.accessToken,{expires:1, secure:true, sameSite:"lax"});
      Cookies.set("authToken", loginResponse.refreshToken,{expires:1, secure:true, sameSite:"lax"});

      const userDetail = await axiosInstance.get("/auth/me") as {role: string};
      console.log(userDetail);
      navigate("/"+userDetail?.role);
      console.log(loginResponse);
    } catch (exception : unknown) {
      toast.error("Invalid or wrong credentials");
      console.log(exception);
    }
  };

  return (
    <AuthPageShell rightPanel={<AuthPromoPanel />}>
      <div className="flex items-center gap-3 mb-8">
        <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-indigo-600 text-white shadow-xl shadow-indigo-500/20">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-6 w-6"
          >
            <path d="M5 4a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V7.414a1 1 0 0 0-.293-.707l-4.414-4.414A1 1 0 0 0 15.586 2H5Zm10 2.414L18.586 10H15a1 1 0 0 1-1-1V6.414ZM6 6h8v3a3 3 0 0 0 3 3h3v8H6V6Zm2 8h8a1 1 0 0 1 0 2H8a1 1 0 1 1 0-2Zm0 4h4a1 1 0 1 1 0 2H8a1 1 0 0 1 0-2Z" />
          </svg>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-600">
            PettyCash Pro
          </p>
        </div>
      </div>

      <h1 className="text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
        Welcome back
      </h1>
      <p className="mt-4 max-w-md text-sm leading-6 text-slate-600">
        Please enter your details to access your dashboard.
      </p>

      <form className="mt-10 space-y-6" onSubmit={handleSubmit(submitForm)}>
        <InputText
          label="Username"
          name="username"
          control={control}
          type="text"
          autoComplete="username"
          placeholder="Enter your username"
          errMsg={errors?.username?.message}
        />

        <InputText
          label="Password"
          name="password"
          control={control}
          type="password"
          autoComplete="current-password"
          placeholder="Enter your password"
          errMsg={errors?.password?.message}
        />

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <label className="inline-flex items-center gap-2 text-sm text-slate-600">
            <input
              className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
              type="checkbox"
            />
            Keep me signed in
          </label>
          <Link
            to="/forget-password"
            className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
          >
            Forgot password?
          </Link>
        </div>

        <SubmitButton>Sign In</SubmitButton>
      </form>

      <div className="mt-8 border-t border-slate-200 pt-6 text-center text-sm text-slate-600">
        Don’t have an account yet?
        <a
          href="#"
          className="ml-2 font-semibold text-indigo-600 hover:text-indigo-700"
        >
          Create an account
        </a>
      </div>
    </AuthPageShell>
  );
}

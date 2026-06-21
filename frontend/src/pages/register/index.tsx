import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import AuthPageShell from "../../components/auth/AuthShell";
import AuthPromoPanel from "../../components/auth/AuthPromoPanel";
import { InputText } from "../../components/form/InputText";
import { SubmitButton } from "../../components/buttons/Button";
import axiosInstance from "../../config/apiClient";
import {
  registerDTO,
  type RegisterFormValues,
} from "../../types/register-types";

export default function Register() {
  const navigate = useNavigate();
  const [selectedImageName, setSelectedImageName] = useState<string>("");

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    defaultValues: {
      name: "",
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
      image: undefined,
    },
    resolver: zodResolver(registerDTO),
  });
  const imageField = register("image");

  const submitForm = async (data: RegisterFormValues) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("username", data.username);
      formData.append("password", data.password);
      formData.append("confirmPassword", data.confirmPassword);

      const imageFile = data.image?.[0];
      if (imageFile) {
        formData.append("image", imageFile);
      }

      await axiosInstance.post("/auth/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Account created successfully");
      navigate("/");
    } catch (exception) {
      console.log(exception);
      toast.error("Registration failed");
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
            <path d="M5 4a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V7.414a1 1 0 0 0-.293-.707l-4.414-4.414A1 1 0 0 0 15.586 2H5Zm10 2.414L18.586 10H15a1 1 0 0 1-1-1V6.414ZM6 6h8v3a3 3 0 0 0 3 3h3v8H6V6Zm2 8h8a1 1 0 0 1 0 2H8a1 1 0 1 1 0-2Zm0 4h4a1 1 0 1 1 0 2H8a1 1 0 1 1 0-2Z" />
          </svg>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-600">
            PettyCash Pro
          </p>
        </div>
      </div>

      <h1 className="text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
        Create account
      </h1>
      <p className="mt-4 max-w-md text-sm leading-6 text-slate-600">
        Fill in your details to create a new user profile.
      </p>

      <form
        className="mt-10 space-y-6"
        onSubmit={handleSubmit(submitForm)}
        encType="multipart/form-data"
      >
        <InputText
          label="Name"
          name="name"
          control={control}
          type="text"
          autoComplete="name"
          placeholder="Enter your name"
          errMsg={errors?.name?.message}
        />

        <InputText
          label="Email"
          name="email"
          control={control}
          type="email"
          autoComplete="email"
          placeholder="Enter your email"
          errMsg={errors?.email?.message}
        />

        <InputText
          label="Username"
          name="username"
          control={control}
          type="text"
          autoComplete="username"
          placeholder="Choose a username"
          errMsg={errors?.username?.message}
        />

        <InputText
          label="Password"
          name="password"
          control={control}
          type="password"
          autoComplete="new-password"
          placeholder="Create a password"
          errMsg={errors?.password?.message}
        />

        <InputText
          label="Confirm Password"
          name="confirmPassword"
          control={control}
          type="password"
          autoComplete="new-password"
          placeholder="Confirm your password"
          errMsg={errors?.confirmPassword?.message}
        />

        <label className="block text-sm font-medium text-slate-700">
          Profile Image
          <input
            {...imageField}
            type="file"
            accept="image/*"
            onChange={(event) => {
              imageField.onChange(event);
              const fileName = event.target.files?.[0]?.name ?? "";
              setSelectedImageName(fileName);
            }}
            className="mt-3 w-full rounded-3xl border border-dashed border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition file:mr-4 file:rounded-2xl file:border-0 file:bg-indigo-600 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:border-indigo-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
          />
          <span className="mt-2 block text-xs text-slate-500">
            {selectedImageName || "Choose an image file"}
          </span>
          <span className="text-sm text-red-600">
            {errors?.image?.message as string}
          </span>
        </label>

        <SubmitButton disabled={isSubmitting}>
          {isSubmitting ? "Creating account..." : "Create Account"}
        </SubmitButton>
      </form>

      <div className="mt-8 border-t border-slate-200 pt-6 text-center text-sm text-slate-600">
        Already have an account?
        <Link
          to="/"
          className="ml-2 font-semibold text-indigo-600 hover:text-indigo-700"
        >
          Sign in
        </Link>
      </div>
    </AuthPageShell>
  );
}

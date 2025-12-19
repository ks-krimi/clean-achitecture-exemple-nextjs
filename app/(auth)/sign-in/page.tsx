"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { loginAction } from "@/app/actions/login.action";
import { LoginFormInput, loginSchema } from "@/app/validators/login.schema";

export default function SignInPage() {
  const [serverError, setServerError] = useState<string | undefined>(undefined);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormInput>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormInput) => {
    setServerError(undefined);
    const result = await loginAction(data);
    if (!result.success) {
      setServerError(result.error);
      return;
    }
    // eslint-disable-next-line react-hooks/immutability
    window.location.href = "/";
  };

  return (
    <div className="grid min-h-screen place-items-center p-8 sm:p-20">
      <main className="flex flex-col gap-6 items-center w-full max-w-sm">
        <h1 className="text-2xl sm:text-4xl font-semibold">
          Login to Wifi Ticket
        </h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col w-full gap-4"
        >
          <label className="flex flex-col">
            <span className="font-medium">Email</span>
            <input {...register("email")} type="email" />
            {errors.email && (
              <span className="text-red-500 text-sm">
                {errors.email.message}
              </span>
            )}
          </label>

          <label className="flex flex-col">
            <span className="font-medium">Password</span>
            <input {...register("password")} type="password" />
            {errors.password && (
              <span className="text-red-500 text-sm">
                {errors.password.message}
              </span>
            )}
          </label>

          {serverError && (
            <span className="text-red-500 text-sm">{serverError}</span>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-2 rounded-full border border-transparent 
                       bg-foreground text-background hover:bg-[#383838] dark:hover:bg-[#ccc] 
                       transition-colors text-sm sm:text-base h-10 px-4"
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="text-sm">
          Don’t have an account?{" "}
          <a href="/sign-up" className="underline hover:no-underline">
            Sign up
          </a>
        </div>
      </main>
    </div>
  );
}

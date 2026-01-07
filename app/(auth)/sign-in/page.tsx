"use client";

import { useRouter } from "next/navigation";

import { useLogin } from "@features/auth/hooks";
import type { LoginPayload } from "@features/auth/types";
import { LoginForm } from "@ui/auth/login";

export default function SignInPage() {
  const router = useRouter();
  const { error, loading, login } = useLogin();

  const onSubmit = async (payload: LoginPayload) => {
    const success = await login(payload);
    if (success) {
      router.replace("/");
    }
  };

  return (
    <div className="grid min-h-screen place-items-center p-8 sm:p-20">
      <main className="flex flex-col gap-6 items-center w-full max-w-sm">
        <h1 className="text-2xl sm:text-4xl font-semibold">
          Login to Wifi Ticket
        </h1>

        <LoginForm onSubmit={onSubmit} error={error} loading={loading} />

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

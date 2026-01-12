"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { useRegister } from "@/src/features/auth/hooks";
import type { RegisterPayload } from "@features/auth/types";
import { RegisterForm } from "@ui/auth/register";

export default function SignUpPage() {
  const router = useRouter();
  const { register, error, loading } = useRegister();

  const onSubmit = async (payload: RegisterPayload) => {
    const success = await register(payload);
    if (success) {
      router.push("/sign-in");
    }
  };

  return (
    <div className="grid min-h-screen place-items-center p-8 sm:p-20">
      <main className="flex flex-col gap-6 items-center w-full max-w-sm">
        <h1 className="text-2xl sm:text-4xl font-semibold">
          Create an account
        </h1>

        <RegisterForm onSubmit={onSubmit} loading={loading} error={error} />

        <div className="text-sm">
          Already have an account?{" "}
          <Link href="/sign-in" className="underline hover:no-underline">
            Sign in
          </Link>
        </div>
      </main>
    </div>
  );
}

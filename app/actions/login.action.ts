"use server";

import { cookies } from "next/headers";

import { container } from "@/src/di/container";

interface LoginPayload {
  email: string;
  password: string;
}

export async function loginAction(payload: LoginPayload) {
  const { email, password } = payload;
  const { loginUseCase } = container.cradle;

  try {
    const { accessToken } = await loginUseCase.execute(email, password);

    (await cookies()).set("access_token", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60, // 1h
    });

    return { success: true };
  } catch (e: unknown) {
    return { success: false, error: (e as Error).message };
  }
}

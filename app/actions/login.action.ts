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
    const { accessToken, refreshToken } = await loginUseCase.execute(
      email,
      password
    );

    const c = await cookies();

    c.set(process.env.ACCESS_TOKEN_KEY!, accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: Number(process.env.ACCESS_TOKEN_EXPIRES_IN),
    });

    c.set(process.env.REFRESH_TOKEN_KEY!, refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: Number(process.env.REFRESH_TOKEN_EXPIRES_IN),
    });

    return { success: true };
  } catch (e: unknown) {
    return { success: false, error: (e as Error).message };
  }
}

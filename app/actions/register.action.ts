"use server";

import { container } from "@/src/di/container";

interface RegisterPayload {
  email: string;
  password: string;
}

export async function registerAction(payload: RegisterPayload) {
  const { email, password } = payload;

  const { registerUseCase } = container.cradle;

  try {
    await registerUseCase.execute(email, password);

    return { success: true };
  } catch (e: unknown) {
    return { success: false, error: (e as Error).message };
  }
}

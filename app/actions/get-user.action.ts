"use server";

import { container } from "@/src/di/container";

export async function getUserAction() {
  const { authSession } = container.cradle;

  try {
    const user = await authSession.getSession();
    return { success: true, user };
  } catch (e: unknown) {
    return { success: false, error: (e as Error).message };
  }
}

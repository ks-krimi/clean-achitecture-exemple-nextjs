"use server";

import { cookies } from "next/headers";

export async function logoutAction() {
  (await cookies()).delete("access_token");
}

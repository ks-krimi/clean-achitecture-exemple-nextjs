import { cookies } from "next/headers";

import { AuthSessionProvider } from "@application/auth/ports/AuthSessionProvider";

export class NextAuthSessionProvider implements AuthSessionProvider {
  async getAccessToken(): Promise<string | null> {
    return (await cookies()).get("access_token")?.value ?? null;
  }
}

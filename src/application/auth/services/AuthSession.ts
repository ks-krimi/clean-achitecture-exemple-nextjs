import { AuthSessionProvider } from "@application/auth/ports/AuthSessionProvider";
import { TokenVerifier } from "@application/auth/ports/TokenVerifier";

export type AuthUser = { id: string; email: string };

export class AuthSession {
  constructor(
    private readonly tokenVerifier: TokenVerifier,
    private readonly authSessionProvider: AuthSessionProvider
  ) {}

  async getUser(): Promise<AuthUser | null> {
    const token = await this.authSessionProvider.getAccessToken();
    if (!token) return null;

    try {
      return this.tokenVerifier.verify<AuthUser>(token);
    } catch {
      return null;
    }
  }
}

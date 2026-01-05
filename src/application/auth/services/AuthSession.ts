import { AuthSessionProvider } from "@application/auth/ports/AuthSessionProvider";
import { ISession, TokenService } from "@application/auth/ports/TokenService";

export class AuthSession {
  constructor(
    private readonly tokenService: TokenService,
    private readonly authSessionProvider: AuthSessionProvider
  ) {}

  async getSession(): Promise<ISession | null> {
    const token = await this.authSessionProvider.getAccessToken();
    if (!token) return null;

    try {
      return this.tokenService.verifyAccessToken(token);
    } catch {
      return null;
    }
  }
}

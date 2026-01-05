export interface ISession {
  readonly sub: string;
  readonly email: string;
  readonly exp: number;
  readonly iat: number;
  readonly roles: string[];
}

export type IPayload = Omit<ISession, "exp" | "iat">;

export interface TokenService {
  generateAccessToken(payload: IPayload): string;
  verifyAccessToken(token: string): ISession;
  generateRefreshToken(payload: IPayload): string;
  verifyRefreshToken(token: string): ISession;

  refreshAccessToken(refreshToken?: string): string | null;
}

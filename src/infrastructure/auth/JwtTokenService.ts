import jwt, { TokenExpiredError } from "jsonwebtoken";

import {
  IPayload,
  ISession,
  TokenService,
} from "@application/auth/ports/TokenService";
import {
  AccessTokenExpiredError,
  InvalidTokenError,
  RefreshTokenExpiredError,
} from "@infrastructure/auth/errors";

type TokenType = "access" | "refresh";

export class JwtTokenService implements TokenService {
  generateAccessToken(payload: IPayload): string {
    const secret = process.env.JWT_ACCESS_SECRET!;
    const expiresIn = Number(process.env.ACCESS_TOKEN_EXPIRES_IN);
    return this.signToken(payload, secret, expiresIn);
  }

  verifyAccessToken(token: string) {
    const secret = process.env.JWT_ACCESS_SECRET!;
    return this.verifyToken(token, secret, "access");
  }

  generateRefreshToken(payload: IPayload): string {
    const secret = process.env.JWT_REFRESH_SECRET!;
    const expiresIn = Number(process.env.REFRESH_TOKEN_EXPIRES_IN);
    return this.signToken(payload, secret, expiresIn);
  }

  verifyRefreshToken(token: string) {
    const secret = process.env.JWT_REFRESH_SECRET!;
    return this.verifyToken(token, secret, "refresh");
  }

  refreshAccessToken(refresh_token?: string): string | null {
    if (!refresh_token) return null;
    try {
      const { email, sub, roles } = this.verifyRefreshToken(refresh_token);
      return this.generateAccessToken({ email, roles, sub });
    } catch {
      return null;
    }
  }

  private signToken(
    payload: IPayload,
    secret: string,
    expiresInSecondes: number
  ) {
    return jwt.sign(payload, secret, { expiresIn: expiresInSecondes });
  }

  private verifyToken(
    token: string,
    secret: string,
    type: TokenType
  ): ISession {
    try {
      return jwt.verify(token, secret) as ISession;
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        if (type === "access") throw new AccessTokenExpiredError();
        if (type === "refresh") throw new RefreshTokenExpiredError();
      }
      throw new InvalidTokenError();
    }
  }
}

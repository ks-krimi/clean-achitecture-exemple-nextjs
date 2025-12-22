import jwt from "jsonwebtoken";

import { TokenVerifier } from "@/src/application/auth/ports/TokenVerifier";

export class JwtTokenVerifier implements TokenVerifier {
  verify<T>(token: string): T {
    return jwt.verify(token, process.env.JWT_SECRET!) as T;
  }
}

import jwt from "jsonwebtoken";

import { TokenService } from "@/src/application/auth/ports/TokenService";
import { User } from "@/src/domain/entities/User";

export class JwtTokenService implements TokenService {
  generateAccessToken(user: User): string {
    const payload = { userId: user.id, email: user.getEmail() };
    return jwt.sign(payload, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });
  }
}

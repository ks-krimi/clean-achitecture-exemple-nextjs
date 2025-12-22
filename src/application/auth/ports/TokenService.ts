import { User } from "@domain/entities/User";

export interface TokenService {
  generateAccessToken(user: User): string;
}

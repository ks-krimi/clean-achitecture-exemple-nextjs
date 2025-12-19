import { User } from "@/src/domain/entities/User";

export interface TokenService {
  generateAccessToken(user: User): string;
}

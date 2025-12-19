import bcrypt, { genSaltSync } from "bcryptjs";

import { PasswordHasher } from "@/src/application/auth/ports/PasswordHasher";

export class BcryptPasswordHasher implements PasswordHasher {
  hash(password: string): Promise<string> {
    return bcrypt.hash(password, genSaltSync(10));
  }

  compare(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}

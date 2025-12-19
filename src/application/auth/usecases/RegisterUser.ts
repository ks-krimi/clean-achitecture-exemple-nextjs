import { randomUUID } from "crypto";

import { User } from "@/src/domain/entities/User";
import { Email } from "@/src/domain/value-objects/Email";
import { HashedPassword } from "@/src/domain/value-objects/HashedPassword";
import { Password } from "@/src/domain/value-objects/Password";
import { IUserRepository } from "../ports/IUserRepository";
import { PasswordHasher } from "../ports/PasswordHasher";

export class RegisterUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly passwordHasher: PasswordHasher
  ) {}

  async execute(emailRaw: string, passwordRaw: string): Promise<void> {
    const email = Email.create(emailRaw);
    const password = Password.create(passwordRaw);

    const existing = await this.userRepository.findByEmail(email.getValue());
    if (existing) {
      throw new Error("User already exists");
    }

    const hashed = await this.passwordHasher.hash(password.getValue());
    const id = randomUUID();

    const user = User.create(id, email, HashedPassword.fromHash(hashed));

    await this.userRepository.save(user);
  }
}

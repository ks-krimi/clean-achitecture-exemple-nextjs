import { randomUUID } from "crypto";

import { IUserRepository } from "@application/auth/ports/IUserRepository";
import { PasswordHasher } from "@application/auth/ports/PasswordHasher";
import { User } from "@domain/entities/User";
import { UserAlreadyExistsError } from "@domain/errors";
import { Email } from "@domain/value-objects/Email";
import { HashedPassword } from "@domain/value-objects/HashedPassword";
import { Password } from "@domain/value-objects/Password";

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
      throw new UserAlreadyExistsError(email);
    }

    const hashed = await this.passwordHasher.hash(password.getValue());
    const id = randomUUID();

    const user = User.create(id, email, HashedPassword.fromHash(hashed));

    await this.userRepository.save(user);
  }
}

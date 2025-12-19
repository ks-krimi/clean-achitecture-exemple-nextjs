import { Email } from "../value-objects/Email";
import { HashedPassword } from "../value-objects/HashedPassword";

export class User {
  private constructor(
    public readonly id: string,
    private readonly email: Email,
    private readonly password: HashedPassword
  ) {}

  static rehydrate(id: string, email: Email, password: HashedPassword): User {
    return new User(id, email, password);
  }

  static create(id: string, email: Email, password: HashedPassword): User {
    return new User(id, email, password);
  }

  getEmail(): string {
    return this.email.getValue();
  }

  getHashedPassword(): string {
    return this.password.getValue();
  }
}

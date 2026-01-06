import { DomainError } from "@domain/errors";
import { Email } from "@domain/value-objects/Email";

export class UserAlreadyExistsError extends DomainError {
  public readonly code = "USER_ALREADY_EXISTS";

  constructor(email: Email) {
    super(`User with email ${email.getValue()} already exists`);
  }
}

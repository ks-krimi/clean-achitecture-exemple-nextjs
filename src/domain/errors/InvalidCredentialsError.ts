import { DomainError } from "@domain/errors";

export class InvalidCredentialsError extends DomainError {
  public readonly code = "INVALID_CREDENTIALS";

  constructor(message?: string) {
    super(message || "Invalid credentials");
  }
}

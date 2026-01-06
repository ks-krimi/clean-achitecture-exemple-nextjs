import { beforeEach, describe, expect, it, vi } from "vitest";

import { IUserRepository } from "@application/auth/ports/IUserRepository";
import { RegisterUseCase } from "@application/auth/usecases/RegisterUser";
import { User } from "@domain/entities/User";
import { UserAlreadyExistsError } from "@domain/errors";
import { Email } from "@domain/value-objects/Email";
import { HashedPassword } from "@domain/value-objects/HashedPassword";
import { BcryptPasswordHasher } from "@infrastructure/auth/BcryptPasswordHasher";

describe("RegiterUseCase", () => {
  let userRepository: IUserRepository;
  let passwordHasher: BcryptPasswordHasher;
  let useCase: RegisterUseCase;

  beforeEach(() => {
    userRepository = {
      findByEmail: vi.fn().mockResolvedValue(null),
      save: vi.fn(),
    };

    passwordHasher = {
      hash: vi.fn().mockResolvedValue("hashed-password"),
      compare: vi.fn(),
    };

    useCase = new RegisterUseCase(userRepository, passwordHasher);
  });

  it("should create a new user if email does not exist", async () => {
    await useCase.execute("test@example.com", "password123");

    expect(userRepository.findByEmail).toHaveBeenCalledWith("test@example.com");
    expect(passwordHasher.hash).toHaveBeenCalledWith("password123");

    expect(userRepository.save).toHaveBeenCalled();
  });

  it("should throw UserAlreadyExistsError if email already exists", async () => {
    const existingUser = User.create(
      "ID",
      Email.create("test@example.com"),
      HashedPassword.fromHash("hashed-password")
    );

    vi.mocked(userRepository.findByEmail).mockResolvedValue(existingUser);

    await expect(
      useCase.execute("test@example.com", "password123")
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);

    expect(userRepository.save).not.toHaveBeenCalled();
  });
});

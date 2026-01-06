import { beforeEach, describe, expect, it, vi } from "vitest";

import { IUserRepository } from "@application/auth/ports/IUserRepository";
import { TokenService } from "@application/auth/ports/TokenService";
import { LoginUseCase } from "@application/auth/usecases/LoginUser";
import { User } from "@domain/entities/User";
import { InvalidCredentialsError } from "@domain/errors";
import { Email } from "@domain/value-objects/Email";
import { HashedPassword } from "@domain/value-objects/HashedPassword";
import { BcryptPasswordHasher } from "@infrastructure/auth/BcryptPasswordHasher";

describe("LoginUserUseCase", () => {
  let userRepository: IUserRepository;
  let passwordHasher: BcryptPasswordHasher;
  let tokenService: TokenService;
  let useCase: LoginUseCase;

  beforeEach(() => {
    userRepository = {
      findByEmail: vi.fn().mockResolvedValue(null),
      save: vi.fn(),
    };

    passwordHasher = {
      hash: vi.fn().mockResolvedValue("hashed-password"),
      compare: vi.fn(),
    };

    tokenService = {
      verifyAccessToken: vi.fn(),
      verifyRefreshToken: vi.fn(),
      generateAccessToken: vi.fn(),
      generateRefreshToken: vi.fn(),
      refreshAccessToken: vi.fn(),
    };

    useCase = new LoginUseCase(userRepository, passwordHasher, tokenService);
  });

  it("should return access and refresh tokens when credentials are valid", async () => {
    const user = User.create(
      "ID",
      Email.create("test@example.com"),
      HashedPassword.fromHash("hashed-password")
    );

    vi.mocked(userRepository.findByEmail).mockResolvedValue(user);
    vi.mocked(passwordHasher.compare).mockResolvedValue(true);

    const result = await useCase.execute("test@example.com", "password123");

    expect(userRepository.findByEmail).toHaveBeenCalledWith("test@example.com");
    expect(passwordHasher.compare).toHaveBeenCalled();

    const payload = { sub: user.id, email: user.getEmail(), roles: [] };

    expect(tokenService.generateAccessToken).toHaveBeenCalledWith(payload);
    expect(tokenService.generateRefreshToken).toHaveBeenCalledWith(payload);

    expect(result).toHaveProperty("accessToken");
    expect(result).toHaveProperty("refreshToken");
  });

  it("should throw InvalidCredentialsError if user does not exist", async () => {
    vi.mocked(userRepository.findByEmail).mockResolvedValue(null);

    await expect(
      useCase.execute("test@example.com", "password123")
    ).rejects.toBeInstanceOf(InvalidCredentialsError);

    expect(passwordHasher.compare).not.toHaveBeenCalled();
  });

  it("should throw InvalidCredentialsError if password is invalid", async () => {
    const user = User.create(
      "ID",
      Email.create("test@example.com"),
      HashedPassword.fromHash("hashed-password")
    );

    vi.mocked(userRepository.findByEmail).mockResolvedValue(user);
    vi.mocked(passwordHasher.compare).mockResolvedValue(false);

    await expect(
      useCase.execute("test@example.com", "wrong-password")
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});

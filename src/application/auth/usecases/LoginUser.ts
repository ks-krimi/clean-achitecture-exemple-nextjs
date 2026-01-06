import { IUserRepository } from "@application/auth/ports/IUserRepository";
import { PasswordHasher } from "@application/auth/ports/PasswordHasher";
import { TokenService } from "@application/auth/ports/TokenService";
import { InvalidCredentialsError } from "@domain/errors";
import { Email } from "@domain/value-objects/Email";
import { Password } from "@domain/value-objects/Password";

export class LoginUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly passwordHasher: PasswordHasher,
    private readonly tokenService: TokenService
  ) {}

  async execute(
    emailRaw: string,
    passwordRaw: string
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const email = Email.create(emailRaw);
    const password = Password.create(passwordRaw);

    const user = await this.userRepository.findByEmail(email.getValue());

    if (!user) {
      throw new InvalidCredentialsError();
    }

    const isValid = await this.passwordHasher.compare(
      password.getValue(),
      user.getHashedPassword()
    );

    if (!isValid) {
      throw new InvalidCredentialsError();
    }

    const payload = { email: user.getEmail(), sub: user.id, roles: [] };

    const accessToken = this.tokenService.generateAccessToken(payload);
    const refreshToken = this.tokenService.generateRefreshToken(payload);

    return { accessToken, refreshToken };
  }
}

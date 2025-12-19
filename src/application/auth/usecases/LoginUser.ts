import { Email } from "@/src/domain/value-objects/Email";
import { Password } from "@/src/domain/value-objects/Password";
import { IUserRepository } from "../ports/IUserRepository";
import { PasswordHasher } from "../ports/PasswordHasher";
import { TokenService } from "../ports/TokenService";

export class LoginUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly passwordHasher: PasswordHasher,
    private readonly tokenService: TokenService
  ) {}

  async execute(
    emailRaw: string,
    passwordRaw: string
  ): Promise<{ accessToken: string }> {
    const email = Email.create(emailRaw);
    const password = Password.create(passwordRaw);

    const user = await this.userRepository.findByEmail(email.getValue());

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isValid = await this.passwordHasher.compare(
      password.getValue(),
      user.getHashedPassword()
    );

    if (!isValid) {
      throw new Error("Invalid credentials");
    }

    const accessToken = this.tokenService.generateAccessToken(user);

    return { accessToken };
  }
}

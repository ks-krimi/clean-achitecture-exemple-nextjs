import { IUserRepository } from "../application/auth/ports/IUserRepository";
import { PasswordHasher } from "../application/auth/ports/PasswordHasher";
import { TokenService } from "../application/auth/ports/TokenService";
import { AuthSession } from "../application/auth/services/AuthSession";
import { LoginUseCase } from "../application/auth/usecases/LoginUser";
import { RegisterUseCase } from "../application/auth/usecases/RegisterUser";

export interface AuthCradle {
  userRepository: IUserRepository;
  passwordHasher: PasswordHasher;
  tokenService: TokenService;

  loginUseCase: LoginUseCase;
  registerUseCase: RegisterUseCase;
  authSession: AuthSession;
}

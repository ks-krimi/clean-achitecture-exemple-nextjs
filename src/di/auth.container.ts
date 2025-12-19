import { AwilixContainer, asClass } from "awilix";

import { LoginUseCase } from "../application/auth/usecases/LoginUser";
import { RegisterUseCase } from "../application/auth/usecases/RegisterUser";
import { BcryptPasswordHasher } from "../infrastructure/auth/BcryptPasswordHasher";
import { JwtTokenService } from "../infrastructure/auth/JwtTokenService";
import { UserRepository } from "../infrastructure/prisma/UserRepository";

import { AuthSession } from "../application/auth/services/AuthSession";
import { JwtTokenVerifier } from "../application/auth/services/JwtTokenVerifier";
import { NextAuthSessionProvider } from "../infrastructure/services/NextAuthSessionProvider";

export function registerAuth(container: AwilixContainer) {
  container.register({
    userRepository: asClass(UserRepository).singleton(),
    passwordHasher: asClass(BcryptPasswordHasher).singleton(),
    tokenService: asClass(JwtTokenService).singleton(),
    loginUseCase: asClass(LoginUseCase).singleton(),
    registerUseCase: asClass(RegisterUseCase).singleton(),

    JwtTokenVerifier: asClass(JwtTokenVerifier).singleton(),
    AuthSession: asClass(AuthSession).scoped(),
    NextAuthSessionProvider: asClass(NextAuthSessionProvider).scoped(),
  });
}

import { IUserRepository } from "@/src/application/auth/ports/IUserRepository";
import { User } from "@/src/domain/entities/User";
import { Email } from "@/src/domain/value-objects/Email";
import { HashedPassword } from "@/src/domain/value-objects/HashedPassword";
import { prisma } from "../prismaClient";

export class UserRepository implements IUserRepository {
  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) return null;

    return User.rehydrate(
      user.id,
      Email.create(user.email),
      HashedPassword.fromHash(user.password)
    );
  }

  async save(user: User): Promise<void> {
    await prisma.user.upsert({
      where: { id: user.id },
      update: { email: user.getEmail(), password: user.getHashedPassword() },
      create: {
        id: user.id,
        email: user.getEmail(),
        password: user.getHashedPassword(),
      },
    });
  }
}

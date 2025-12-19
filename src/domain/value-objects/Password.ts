export class Password {
  private constructor(private readonly value: string) {}

  public static create(password: string): Password {
    if (password.length < 8) {
      throw new Error("Password too short");
    }
    return new Password(password);
  }

  public getValue(): string {
    return this.value;
  }
}

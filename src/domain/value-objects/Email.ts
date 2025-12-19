export class Email {
  private constructor(private readonly value: string) {}

  public static create(email: string): Email {
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      throw new Error("Invalid email");
    }
    return new Email(email);
  }

  public getValue(): string {
    return this.value;
  }
}

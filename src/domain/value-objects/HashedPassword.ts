export class HashedPassword {
  private constructor(private readonly value: string) {}

  static fromHash(hash: string): HashedPassword {
    return new HashedPassword(hash);
  }

  getValue(): string {
    return this.value;
  }
}

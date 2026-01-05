export class RefreshTokenExpiredError extends Error {
  constructor(message?: string) {
    super(message || "Refresh token expired");
    this.name = "RefreshTokenExpiredError";
  }
}

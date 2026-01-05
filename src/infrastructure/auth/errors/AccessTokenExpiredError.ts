export class AccessTokenExpiredError extends Error {
  constructor(message?: string) {
    super(message || "Access token expired");
    this.name = "AccessTokenExpiredError";
  }
}

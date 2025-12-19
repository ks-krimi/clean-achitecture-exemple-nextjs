export interface TokenVerifier {
  verify<T>(token: string): T;
}

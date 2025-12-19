export interface AuthSessionProvider {
  getAccessToken(): Promise<string | null>;
}

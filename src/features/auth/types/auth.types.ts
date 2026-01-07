export interface LoginPayload {
  readonly email: string;
  readonly password: string;
}

export interface RegisterPayload {
  readonly email: string;
  readonly password: string;
}

export interface Session {
  readonly sub: string;
  readonly email: string;
  readonly exp: number;
  readonly iat: number;
  readonly roles: string[];
}

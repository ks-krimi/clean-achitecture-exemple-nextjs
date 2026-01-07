import { getUserAction } from "@app/actions/get-user.action";
import { loginAction } from "@app/actions/login.action";
import { logoutAction } from "@app/actions/logout.action";
import { registerAction } from "@app/actions/register.action";
import type { LoginPayload, RegisterPayload } from "@features/auth/types";

export const AuthService = {
  login: (payload: LoginPayload) => loginAction(payload),
  register: (payload: RegisterPayload) => registerAction(payload),
  logout: () => logoutAction(),
  getSession: () => getUserAction(),
};

"use client";

import { useState } from "react";

import { AuthService } from "@features/auth/services";
import { LoginPayload } from "@features/auth/types";

export function useLogin() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const login = async (payload: LoginPayload): Promise<boolean> => {
    setLoading(true);
    setError(undefined);

    const result = await AuthService.login(payload);

    if (!result.success) {
      setError(result.error);
    }

    setLoading(false);

    return result.success;
  };

  return { loading, error, login };
}

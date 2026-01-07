import { useState } from "react";

import { RegisterPayload } from "@features/auth/types";
import { AuthService } from "@features/auth/services";

export function useRegister() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const register = async (payload: RegisterPayload) => {
    setLoading(true);
    setError(undefined);

    const result = await AuthService.register(payload);

    if (!result.success) {
      setError(result.error);
    }

    setLoading(false);

    return result.success;
  };

  return { loading, register, error };
}

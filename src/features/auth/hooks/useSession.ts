import { useState } from "react";

import { AuthService } from "@features/auth/services";
import type { Session } from "@features/auth/types";

export function useSession() {
  const [loading, setLoading] = useState<boolean>(false);
  const [session, setSession] = useState<Session | null>(null);
  const [error, setError] = useState<string | undefined>(undefined);

  const getSession = async () => {
    setLoading(true);
    setError(undefined);

    const result = await AuthService.getSession();

    if (result.success && result.user) {
      setSession(result.user);
    } else {
      setError(result.error);
    }

    setLoading(false);
  };

  return { loading, error, session, getSession };
}

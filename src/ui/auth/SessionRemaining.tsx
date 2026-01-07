"use client";

import { useEffect, useState } from "react";

type SessionRemainingProps = { exp: number };

export default function SessionRemaining({ exp }: SessionRemainingProps) {
  const [remainingSeconds, setRemainingSeconds] = useState<number>(0);

  useEffect(() => {
    const expiresAt = exp * 1000;

    const update = () => {
      const remaining = Math.max(
        0,
        Math.floor((expiresAt - Date.now()) / 1000)
      );
      setRemainingSeconds(remaining);
    };

    update();
    const interval = setInterval(update, 1000);

    return () => clearInterval(interval);
  }, [exp]);

  return (
    <div className="max-w-3xl mx-auto text-sm text-zinc-700 dark:text-zinc-300">
      Session expire dans <strong>{remainingSeconds}s</strong>
    </div>
  );
}

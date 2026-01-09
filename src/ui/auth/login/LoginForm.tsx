import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { LoginPayload } from "@features/auth/types";
import { LoginFormInput, loginSchema } from "@ui/auth/login";
import { Button } from "@ui/shared/atoms/Button";
import { ControlledInput } from "@ui/shared/molecules/ControlledInput";

type LoginFormProps = {
  onSubmit: (payload: LoginPayload) => void;
  loading: boolean;
  error?: string;
};

export function LoginForm({ onSubmit, error }: LoginFormProps) {
  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm<LoginFormInput>({
    resolver: zodResolver(loginSchema),
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col w-full gap-4"
    >
      <ControlledInput
        label="Email"
        type="email"
        name="email"
        control={control}
      />

      <ControlledInput
        label="Password"
        type="password"
        name="password"
        control={control}
      />

      {error && <span className="text-red-500 text-sm">{error}</span>}

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Logging in..." : "Login"}
      </Button>
    </form>
  );
}

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { RegisterPayload } from "@features/auth/types";
import { RegisterFormInput, registerSchema } from "@ui/auth/register";
import { Button } from "@ui/shared/atoms/Button";
import { ControlledInput } from "@ui/shared/molecules/ControlledInput";

type RegisterFormProps = {
  onSubmit: (payload: RegisterPayload) => void;
  loading: boolean;
  error?: string;
};

export function RegisterForm({ onSubmit, error }: RegisterFormProps) {
  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm<RegisterFormInput>({
    resolver: zodResolver(registerSchema),
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
        {isSubmitting ? "Creating..." : "Create account"}
      </Button>
    </form>
  );
}

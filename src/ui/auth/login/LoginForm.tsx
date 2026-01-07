import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { LoginPayload } from "@features/auth/types";
import { LoginFormInput, loginSchema } from "@ui/auth/login";

type LoginFormProps = {
  onSubmit: (payload: LoginPayload) => void;
  loading: boolean;
  error?: string;
};

export function LoginForm({ onSubmit, error }: LoginFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormInput>({
    resolver: zodResolver(loginSchema),
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col w-full gap-4"
    >
      <label className="flex flex-col">
        <span className="font-medium">Email</span>
        <input {...register("email")} type="email" />
        {errors.email && (
          <span className="text-red-500 text-sm">{errors.email.message}</span>
        )}
      </label>

      <label className="flex flex-col">
        <span className="font-medium">Password</span>
        <input {...register("password")} type="password" />
        {errors.password && (
          <span className="text-red-500 text-sm">
            {errors.password.message}
          </span>
        )}
      </label>

      {error && <span className="text-red-500 text-sm">{error}</span>}

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-2 rounded-full border border-transparent 
                       bg-foreground text-background hover:bg-[#383838] dark:hover:bg-[#ccc] 
                       transition-colors text-sm sm:text-base h-10 px-4"
      >
        {isSubmitting ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}

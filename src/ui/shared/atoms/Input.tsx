import { ComponentProps } from "react";

import { Input as ShadcnInput } from "@ui/shadcn/input";

type InputProps = ComponentProps<typeof ShadcnInput>;

export function Input(props: InputProps) {
  return <ShadcnInput {...props} />;
}

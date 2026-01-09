import { ComponentProps } from "react";

import { Button as ShadcnButton } from "@ui/shadcn/button";

type ButtonProps = ComponentProps<typeof ShadcnButton>;

export function Button(props: ButtonProps) {
  return <ShadcnButton {...props} />;
}

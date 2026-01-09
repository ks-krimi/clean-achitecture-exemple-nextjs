import { ComponentProps } from "react";

import { Label as ShadcnLabel } from "@ui/shadcn/label";

type LabelProps = ComponentProps<typeof ShadcnLabel>;

export function Label(props: LabelProps) {
  return <ShadcnLabel {...props} />;
}

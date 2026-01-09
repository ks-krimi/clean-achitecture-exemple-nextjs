import { ComponentProps } from "react";

import { Input } from "@ui/shared/atoms/Input";
import { Label } from "@ui/shared/atoms/Label";

type BasedInputProps = ComponentProps<typeof Input> & { label?: string };

export function BasedInput({ label, ...rest }: BasedInputProps) {
  return (
    <div className="flex flex-col gap-2">
      {label && <Label>{label}</Label>}
      <Input {...rest} />
    </div>
  );
}

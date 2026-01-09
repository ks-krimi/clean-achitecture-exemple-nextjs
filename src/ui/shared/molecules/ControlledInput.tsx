import { ComponentProps } from "react";
import {
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";

import { BasedInput } from "@ui/shared/molecules/BasedInput";

type ControlledInputProps<T extends FieldValues> = UseControllerProps<T> &
  ComponentProps<typeof BasedInput>;

export function ControlledInput<T extends FieldValues>({
  name,
  control,
  defaultValue,
  ...props
}: ControlledInputProps<T>) {
  const { field, fieldState } = useController<T>({
    name,
    control,
    defaultValue,
  });
  return (
    <div className="flex flex-col">
      <BasedInput {...props} onChange={field.onChange} />
      {fieldState.error && (
        <p className="mt-1 text-xs text-red-600">
          {fieldState.error.message || ""}
        </p>
      )}
    </div>
  );
}

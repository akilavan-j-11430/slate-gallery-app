"use client";

import * as React from "react";
import { Input } from "@/client/shadcn/components/ui/input";
import {
  Field,
  FieldError,
  FieldLabel
} from "@/client/shadcn/components/ui/field";
import { cn } from "@/client/shadcn/lib/utils";

type Props = {
  name: string;
  label?: string;
  accept?: string;
  disabled?: boolean;
  value: File | null;
  onChange: (file: File | null) => void;
  errorMessage?: string;
  classNames?: {
    container?: string;
    input?: string;
    label?: string;
    errorMessage?: string;
  };
};

export default function FileInput({
  name,
  label,
  accept,
  disabled,
  onChange,
  errorMessage,
  classNames
}: Props) {
  const hasError = Boolean(errorMessage);
  return (
    <Field className={cn("w-full space-y-1", classNames?.container)}>
      {label && <FieldLabel className={classNames?.label}>{label}</FieldLabel>}

      <Input
        type="file"
        name={name}
        accept={accept}
        disabled={disabled}
        className={cn(classNames?.input)}
        aria-invalid={hasError}
        placeholder=""
        onChange={(e) => {
          const file = e.target.files?.[0] ?? null;
          onChange(file);
        }}
      />

      {errorMessage && (
        <FieldError className={classNames?.errorMessage}>
          {errorMessage}
        </FieldError>
      )}
    </Field>
  );
}

import { Input } from "@/client/shadcn/components/ui/input";
import {
  Field,
  FieldLabel,
  FieldError
} from "@/client/shadcn/components/ui/field";
import { cn } from "@/client/shadcn/lib/utils";

type Props = {
  name: string;
  value: string;
  label?: string;
  onBlur?(e: React.FocusEvent<HTMLInputElement>): void;
  onChange(e: React.ChangeEvent<HTMLInputElement>): void;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  autoComplete?: boolean;
  classNames?: {
    input?: string;
    label?: string;
    container?: string;
    errorMessage?: string;
  };
  errorMessage?: string;
};

export default function TextInput({
  name,
  label,
  value,
  onChange,
  onBlur,
  errorMessage,
  ...props
}: Props) {
  const hasError = Boolean(errorMessage);

  return (
    <Field className={props.classNames?.container}>
      {label && <FieldLabel>{label}</FieldLabel>}

      <Input
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={props.placeholder}
        disabled={props.disabled}
        autoComplete={props.autoComplete ? "on" : "off"}
        required={props.required}
        aria-invalid={hasError}
        className={cn(props.classNames?.input)}
      />

      {errorMessage && (
        <FieldError className={props.classNames?.errorMessage}>
          {errorMessage}
        </FieldError>
      )}
    </Field>
  );
}

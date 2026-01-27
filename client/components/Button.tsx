import { buttonVariants, Button as ShadcnButton } from "@/client/shadcn/components/ui/button";
import { Spinner } from "@/client/shadcn/components/ui/spinner";
import { VariantProps } from "class-variance-authority";

type ButtonVariants = VariantProps<typeof buttonVariants>;
type ButtonProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "children"
> &
  Omit<ButtonVariants, "size"> & {
    label: string;
    size?: Exclude<ButtonVariants["size"], "icon">;
    isLoading?: boolean;
  };
  

export default function Button({
  label,
  isLoading = false,
  size = "default",
  variant,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <ShadcnButton
      size={size}
      variant={variant}
      disabled={isLoading || disabled}
      {...props}
    >
      {label}
      {isLoading && <Spinner />}
    </ShadcnButton>
  );
}

import Link from "next/link";
import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary";

type BaseProps = {
  children: ReactNode;
  className?: string;
  variant?: ButtonVariant;
};

type ButtonAsButton = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type ButtonAsLink = BaseProps & {
  href: string;
};

type ButtonProps = ButtonAsButton | ButtonAsLink;

const baseStyles =
  "inline-flex items-center justify-center rounded-full px-5 py-2 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2";

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-primary-600 text-white hover:bg-primary-500 focus-visible:outline-primary-600",
  secondary:
    "bg-white text-primary-600 ring-1 ring-inset ring-primary-600/30 hover:bg-primary-50 focus-visible:outline-primary-600",
};

export default function Button(props: ButtonProps) {
  const { children, className, variant = "primary" } = props;
  const classes = cn(baseStyles, variantStyles[variant], className);

  if ("href" in props && props.href) {
    return (
      <Link href={props.href} className={classes}>
        {children}
      </Link>
    );
  }

  const { href: _href, ...buttonProps } = props;

  return (
    <button className={classes} {...buttonProps}>
      {children}
    </button>
  );
}

import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Link } from "react-router-dom";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";

interface BaseButtonProps {
  variant?: ButtonVariant;
  icon?: ReactNode;
  children: ReactNode;
  href?: string;
  fullWidth?: boolean;
}

function getClassName(variant: ButtonVariant, fullWidth?: boolean) {
  return ["ui-button", `ui-button--${variant}`, fullWidth ? "ui-button--full" : ""]
    .filter(Boolean)
    .join(" ");
}

export function Button({
  variant = "primary",
  icon,
  children,
  href,
  fullWidth,
  ...props
}: BaseButtonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  if (href) {
    return (
      <Link className={getClassName(variant, fullWidth)} to={href}>
        {icon ? <span className="ui-button__icon">{icon}</span> : null}
        <span>{children}</span>
      </Link>
    );
  }

  return (
    <button className={getClassName(variant, fullWidth)} {...props}>
      {icon ? <span className="ui-button__icon">{icon}</span> : null}
      <span>{children}</span>
    </button>
  );
}

import type { ButtonHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  loading?: boolean;
  icon?: ReactNode;
  // added 'navbar' for compact navbar buttons
  size?: "sm" | "md" | "lg";
}

export const Button = ({
  variant = "primary",
  loading = false,
  icon,
  size = "md",
  className,
  ...props
}: ButtonProps) => {
  const sizeClasses: Record<"sm" | "md" | "lg", string> = {
    // navbar: extra compact for use inside navbars / tight UIs
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button
      disabled={loading}
      className={clsx(
        // base styles
        "font-medium transition-all duration-200 shadow-sm",
        // variant styles
        variant === "primary"
          ? "rounded-lg bg-blue-600 text-white hover:bg-blue-700"
          : "rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300",
        // rounded and spacing come from size so navbar can be compact
        sizeClasses[size],
        // allow overriding
        className
      )}
      {...props}
    >
      {loading
        ? "Loading..."
        : icon
        ? <>{icon} {props.children}</>
        : props.children}
    </button>
  );
};

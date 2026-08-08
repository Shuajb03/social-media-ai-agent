import { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from "react";
import Link from "next/link";
import clsx from "clsx";

type Variant = "primary" | "secondary" | "ghost" | "outline-cream";
type Size = "md" | "lg" | "sm";

const base =
  "inline-flex items-center justify-center gap-2 font-sans uppercase tracking-[0.14em] text-xs font-medium transition-colors duration-200 disabled:opacity-40 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary: "bg-ink text-cream hover:bg-gold hover:text-ink",
  secondary: "bg-gold text-ink hover:bg-ink hover:text-cream",
  ghost: "bg-transparent text-ink border border-ink/25 hover:border-ink",
  "outline-cream": "bg-transparent text-cream border border-cream/40 hover:border-cream hover:bg-cream hover:text-ink",
};

const sizes: Record<Size, string> = {
  sm: "px-4 py-2.5",
  md: "px-6 py-3.5",
  lg: "px-8 py-4.5",
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
}

type ButtonProps = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type LinkProps = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

export function Button(props: ButtonProps | LinkProps) {
  const { variant = "primary", size = "md", children, className, ...rest } = props;
  const cls = clsx(base, variants[variant], sizes[size], className);

  if ("href" in props && props.href) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { href, ...anchorRest } = rest as AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <Link href={props.href} className={cls} {...anchorRest}>
        {children}
      </Link>
    );
  }

  return (
    <button className={cls} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}

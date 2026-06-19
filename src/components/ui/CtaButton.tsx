type CtaButtonProps = {
  href: string;
  label: string;
  variant?: "primary" | "secondary" | "ghost";
  external?: boolean;
};

export function CtaButton({
  href,
  label,
  variant = "primary",
  external = false,
}: CtaButtonProps) {
  const base =
    "inline-flex min-h-11 items-center justify-center px-7 text-xs font-bold uppercase tracking-wider transition-colors";
  const styles = {
    primary: `${base} bg-accent text-surface hover:opacity-90`,
    secondary: `${base} border border-text/20 text-text hover:border-text/40`,
    ghost: `${base} text-text underline decoration-accent decoration-2 underline-offset-4`,
  }[variant];

  const externalProps = external
    ? { target: "_blank" as const, rel: "noopener noreferrer" }
    : {};

  return (
    <a href={href} className={styles} {...externalProps}>
      {label}
    </a>
  );
}

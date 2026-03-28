import Link from "next/link";
import { cn } from "@/lib/utils";

type BadgeProps = {
  children: React.ReactNode;
  icon?: React.ReactNode;
  href?: string;
  className?: string;
};

/**
 * Badge/pill component for labels, announcements, or tags.
 * Displays a small rounded pill with optional icon and link support.
 */
export function Badge({ children, icon, href, className }: BadgeProps) {
  const baseStyles = cn(
    "inline-flex items-center gap-2",
    "px-3 py-1.5",
    "text-sm text-white/70",
    "bg-white/10",
    "border border-white/10",
    "rounded-full",
    "transition-colors duration-200",
    href && "hover:bg-white/15 hover:border-white/20",
    className
  );

  const content = (
    <>
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span>{children}</span>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={baseStyles}>
        {content}
      </Link>
    );
  }

  return <span className={baseStyles}>{content}</span>;
}

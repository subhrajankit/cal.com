import { cn } from "@/lib/utils";

type CardProps = {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "article" | "section";
};

/**
 * Card component with dark theme styling.
 * Features subtle background, border, and hover effects.
 */
export function Card({ children, className, as: Component = "div" }: CardProps) {
  return (
    <Component
      className={cn(
        "bg-white/[0.03]",
        "border border-white/[0.06]",
        "rounded-2xl",
        "p-8",
        "transition-all duration-300 ease-out",
        "hover:border-white/[0.12] hover:bg-white/[0.05]",
        className
      )}
    >
      {children}
    </Component>
  );
}

type CardHeaderProps = {
  children: React.ReactNode;
  className?: string;
};

/**
 * Card header component for title and description grouping.
 */
export function CardHeader({ children, className }: CardHeaderProps) {
  return <div className={cn("mb-4", className)}>{children}</div>;
}

type CardTitleProps = {
  children: React.ReactNode;
  className?: string;
  as?: "h2" | "h3" | "h4";
};

/**
 * Card title component.
 */
export function CardTitle({
  children,
  className,
  as: Component = "h3",
}: CardTitleProps) {
  return (
    <Component
      className={cn("text-xl font-semibold text-white mb-2", className)}
    >
      {children}
    </Component>
  );
}

type CardDescriptionProps = {
  children: React.ReactNode;
  className?: string;
};

/**
 * Card description component for supporting text.
 */
export function CardDescription({ children, className }: CardDescriptionProps) {
  return (
    <p className={cn("text-[15px] text-white/60 leading-relaxed", className)}>
      {children}
    </p>
  );
}

type CardContentProps = {
  children: React.ReactNode;
  className?: string;
};

/**
 * Card content component for the main body.
 */
export function CardContent({ children, className }: CardContentProps) {
  return <div className={cn(className)}>{children}</div>;
}

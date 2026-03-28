import { cn } from "@/lib/utils";

type SectionProps = {
  children: React.ReactNode;
  id?: string;
  className?: string;
  containerClassName?: string;
  as?: "section" | "div";
};

/**
 * Section wrapper component for page sections.
 * Provides full-width background with centered max-width container.
 */
export function Section({
  children,
  id,
  className,
  containerClassName,
  as: Component = "section",
}: SectionProps) {
  return (
    <Component id={id} className={cn("w-full py-24 px-6", className)}>
      <div
        className={cn(
          "mx-auto w-full max-w-[1200px]",
          containerClassName
        )}
      >
        {children}
      </div>
    </Component>
  );
}

type SectionHeaderProps = {
  children: React.ReactNode;
  className?: string;
  centered?: boolean;
};

/**
 * Section header component for section titles and descriptions.
 */
export function SectionHeader({
  children,
  className,
  centered = false,
}: SectionHeaderProps) {
  return (
    <div className={cn("mb-12", centered && "text-center", className)}>
      {children}
    </div>
  );
}

type SectionTitleProps = {
  children: React.ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3";
};

/**
 * Section title component.
 */
export function SectionTitle({
  children,
  className,
  as: Component = "h2",
}: SectionTitleProps) {
  return (
    <Component
      className={cn(
        "text-4xl md:text-5xl font-bold text-white mb-4 leading-tight",
        className
      )}
    >
      {children}
    </Component>
  );
}

type SectionDescriptionProps = {
  children: React.ReactNode;
  className?: string;
};

/**
 * Section description component for supporting text.
 */
export function SectionDescription({
  children,
  className,
}: SectionDescriptionProps) {
  return (
    <p
      className={cn(
        "text-lg text-white/60 max-w-2xl leading-relaxed",
        className
      )}
    >
      {children}
    </p>
  );
}

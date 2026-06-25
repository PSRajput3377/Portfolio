import { cn } from "@/lib/utils";

interface SectionProps {
  id: string;
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "muted" | "elevated";
}

const variants = {
  default: "",
  muted: "border-t border-border/60 bg-muted/15",
  elevated:
    "border-t border-border/60 bg-gradient-to-b from-muted/20 via-background to-background",
};

export function Section({ id, children, className, variant = "default" }: SectionProps) {
  return (
    <section id={id} className={cn("relative py-24 sm:py-32", variants[variant], className)}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">{children}</div>
    </section>
  );
}

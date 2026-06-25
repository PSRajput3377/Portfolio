import { cn } from "@/lib/utils";

interface TextShimmerProps {
  children: React.ReactNode;
  className?: string;
}

export function TextShimmer({ children, className }: TextShimmerProps) {
  return (
    <span
      className={cn(
        "animate-text-shimmer bg-[length:200%_auto] bg-clip-text text-transparent",
        className
      )}
      style={{
        backgroundImage:
          "linear-gradient(90deg, var(--accent) 0%, var(--accent-secondary) 25%, #e8e8ff 50%, var(--accent-secondary) 75%, var(--accent) 100%)",
      }}
    >
      {children}
    </span>
  );
}

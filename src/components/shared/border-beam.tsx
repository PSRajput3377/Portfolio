import { cn } from "@/lib/utils";

interface BorderBeamProps {
  className?: string;
  size?: number;
  duration?: number;
}

export function BorderBeam({
  className,
  size = 200,
  duration = 8,
}: BorderBeamProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]",
        className
      )}
      aria-hidden
    >
      <div className="rounded-[inherit] border-beam-mask absolute inset-0">
        <div
          className="absolute aspect-square w-[120px] animate-border-beam opacity-80"
          style={{
            background:
              "linear-gradient(90deg, transparent, var(--accent), transparent)",
            animationDuration: `${duration}s`,
          }}
        />
      </div>
    </div>
  );
}

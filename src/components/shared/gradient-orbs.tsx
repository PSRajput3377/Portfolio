export function GradientOrbs() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="orb orb-1 absolute -left-[15%] top-[5%] h-[480px] w-[480px] rounded-full bg-accent/20 blur-[130px]" />
      <div className="orb orb-2 absolute -right-[10%] top-[25%] h-[380px] w-[380px] rounded-full bg-accent-secondary/15 blur-[110px]" />
      <div className="orb orb-3 absolute bottom-[5%] left-[25%] h-[300px] w-[300px] rounded-full bg-blue-500/10 blur-[100px]" />
    </div>
  );
}

export function AuroraBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-aurora" />
      <div className="absolute inset-0 grid-bg opacity-50" />
      <div className="absolute -top-40 left-1/4 h-[36rem] w-[36rem] rounded-full bg-primary/20 blur-3xl animate-float-slow" />
      <div className="absolute -bottom-40 right-1/4 h-[36rem] w-[36rem] rounded-full bg-accent/20 blur-3xl animate-float-slow" style={{ animationDelay: "-7s" }} />
    </div>
  );
}

export function AnnouncementBar() {
  const custom = process.env.NEXT_PUBLIC_ANNOUNCEMENT_TEXT;
  return (
    <div
      className="relative z-[3] w-full border-b border-[color:var(--oob-topbar-border)] bg-[var(--oob-topbar-bg)] text-center text-xs font-medium uppercase tracking-[0.2em] text-[color:var(--oob-topbar-text)] py-2.5 px-4"
      role="region"
      aria-label="Anuncio"
    >
      {custom ? (
        <span className="opacity-95">{custom}</span>
      ) : (
        <>
          <span className="text-[var(--oob-gold)]">Envío gratis</span>
          <span className="mx-2 text-[color:var(--oob-topbar-muted)]">·</span>
          <span className="text-[color:var(--oob-topbar-muted)]">
            pedidos superiores a $3,000 MXN — código{" "}
          </span>
          <span className="text-[var(--oob-gold)] font-semibold">OOB10</span>
        </>
      )}
    </div>
  );
}

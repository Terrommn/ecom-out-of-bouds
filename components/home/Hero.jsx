import Image from "next/image";
import Link from "next/link";

const HERO_IMAGE = "/brand/hero-magazine.png";

export function Hero() {
  return (
    <section
      className="hero-magazine relative isolate flex min-h-[min(100svh,56rem)] flex-col justify-end overflow-hidden border-b border-[color:var(--oob-border)] pb-12 pt-28 md:min-h-[min(100svh,52rem)] md:pb-16 md:pt-32 lg:pb-20"
      aria-labelledby="hero-heading"
    >
      <div className="pointer-events-none absolute inset-0 z-0">
        <Image
          src={HERO_IMAGE}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_32%]"
        />
        {/* Capas editoriales: lectura sobre el cielo y el green */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-[var(--color-mighty-green)] via-[var(--color-mighty-green)]/75 to-[#1a2e28]/20"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_70%_20%,rgba(225,192,113,0.12),transparent_55%)]"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-[var(--color-mighty-green)] via-transparent to-black/25"
          aria-hidden
        />
        <div
          className="absolute inset-0 opacity-[0.35] mix-blend-overlay"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(255,255,255,0.03) 1px, rgba(255,255,255,0.03) 2px)",
          }}
          aria-hidden
        />
      </div>

      <div className="oob-container relative z-[2] grid flex-1 grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8 lg:gap-y-14">
        {/* Riel vertical estilo índice de revista */}
        <div className="hero-mag-rail hidden lg:col-span-1 lg:flex lg:flex-col lg:items-center lg:justify-end lg:pb-2">
          <p className="hero-mag-vertical font-mono text-[10px] uppercase tracking-[0.55em] text-white/45">
            Edición · I
          </p>
        </div>

        <div className="lg:col-span-6 lg:col-start-2 xl:col-span-5">
          <div className="hero-mag-kicker mb-5 flex flex-wrap items-center gap-3">
            <span className="inline-block h-px w-10 bg-[var(--oob-gold)]" aria-hidden />
            <span className="font-mono text-[11px] font-medium uppercase tracking-[0.4em] text-[var(--oob-gold)]">
              Golf · rendimiento · estilo
            </span>
          </div>

          <p className="hero-mag-issue mb-4 font-mono text-[10px] uppercase tracking-[0.35em] text-white/50">
            Portada · Primavera 2026
          </p>

          <h1
            id="hero-heading"
            className="hero-mag-title font-serif text-[2.35rem] font-medium leading-[0.98] tracking-[-0.03em] text-white sm:text-5xl md:text-[3.25rem] lg:text-[3.75rem] xl:text-[4.25rem]"
          >
            Donde el{" "}
            <em className="not-italic text-[var(--oob-gold)]">fairway</em>
            <br className="hidden sm:block" />{" "}
            <span className="text-white/95">se encuentra con el lujo</span>
          </h1>

          <div className="hero-mag-rule mt-8 flex items-center gap-4">
            <span className="h-px flex-1 max-w-[6rem] bg-gradient-to-r from-[var(--oob-gold)] to-transparent" aria-hidden />
            <span className="font-mono text-[9px] uppercase tracking-[0.5em] text-white/40">
              Out Of Bounds
            </span>
          </div>

          <p className="hero-mag-deck mt-8 max-w-lg text-base leading-[1.65] text-white/78 md:text-[1.05rem]">
            Ropa y accesorios de golf para quien busca precisión en el swing y una silueta impecable
            fuera del campo — editorial, atemporal, sin concesiones.
          </p>

          <div className="hero-mag-cta mt-10 flex flex-wrap items-center gap-5">
            <Link
              href="/collections/all"
              className="group inline-flex items-center gap-3 border border-white/25 bg-white/[0.07] px-7 py-3.5 text-[11px] font-semibold uppercase tracking-[0.28em] text-white backdrop-blur-sm transition hover:border-[var(--oob-gold)]/60 hover:bg-[var(--oob-gold)]/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--oob-gold)]"
            >
              Colección
              <span
                className="inline-block transition-transform group-hover:translate-x-0.5"
                aria-hidden
              >
                →
              </span>
            </Link>
            <Link
              href="/acerca"
              className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/70 underline-offset-[6px] transition hover:text-[var(--oob-gold)] hover:underline"
            >
              Manifiesto
            </Link>
          </div>
        </div>

        {/* Columna derecha: bloque editorial */}
        <aside className="hero-mag-aside flex flex-col justify-end lg:col-span-4 lg:col-start-8 xl:col-start-9">
          <div className="border border-white/20 bg-[var(--color-mighty-green)]/35 p-6 backdrop-blur-md md:p-8">
            <p className="font-mono text-[9px] uppercase tracking-[0.45em] text-[var(--oob-gold)]">
              En esta edición
            </p>
            <ul className="mt-6 space-y-4 border-t border-white/15 pt-6 font-serif text-lg leading-snug text-white/92 md:text-xl">
              <li className="flex gap-4">
                <span className="font-mono text-xs text-white/35">01</span>
                <span>Tejidos técnicos con caída de sastrería</span>
              </li>
              <li className="flex gap-4">
                <span className="font-mono text-xs text-white/35">02</span>
                <span>Paletas inspiradas en el verde y la hora dorada</span>
              </li>
              <li className="flex gap-4">
                <span className="font-mono text-xs text-white/35">03</span>
                <span>Detalles minimalistas, rendimiento máximo</span>
              </li>
            </ul>
          </div>
          <p className="mt-5 font-mono text-[9px] uppercase tracking-[0.35em] text-white/40">
            Fotografía · Campo · Golden hour
          </p>
        </aside>
      </div>

      {/* Pie de página tipo masthead */}
      <div className="oob-container relative z-[2] mt-12 hidden border-t border-white/10 pt-6 md:mt-14 md:block md:pt-8">
        <div className="flex flex-wrap items-center justify-between gap-4 text-[10px] font-mono uppercase tracking-[0.25em] text-white/35">
          <span>Out Of Bounds — golf de lujo</span>
          <span className="hidden sm:inline">Estilo editorial · ecommerce</span>
          <Link
            href="/search"
            className="text-white/55 transition hover:text-[var(--oob-gold)]"
          >
            Buscar productos →
          </Link>
        </div>
      </div>
    </section>
  );
}

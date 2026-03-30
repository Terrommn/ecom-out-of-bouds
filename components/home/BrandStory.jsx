import Link from "next/link";
import { BrandBadge } from "@/components/brand/BrandBadge";
import { GsapReveal } from "./GsapReveal";

export function BrandStory() {
  return (
    <GsapReveal as="section" className="py-20 md:py-28 border-b border-[color:var(--oob-border)]">
      <div className="oob-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative aspect-[4/5] rounded-lg border border-[color:var(--oob-border)] overflow-hidden bg-[var(--oob-bg-elevated)]">
              <div
                className="absolute inset-0 bg-gradient-to-br from-[var(--oob-fairway)]/30 via-transparent to-[var(--oob-gold)]/10"
                aria-hidden
              />
              <div className="absolute inset-0 flex items-center justify-center p-6 md:p-10">
                <BrandBadge
                  className="text-[var(--oob-cream)]/90"
                  heightClass="h-[min(52vh,420px)] w-auto max-h-[85%]"
                />
              </div>
            </div>
          </div>
          <div className="lg:col-span-7 order-1 lg:order-2">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--oob-gold)] mb-3">
              Sobre nuestra marca
            </p>
            <h2 className="oob-heading-xl text-3xl md:text-4xl lg:text-5xl text-[var(--oob-cream)]">
              Calidad, estilo y rendimiento
            </h2>
            <p className="mt-6 text-[var(--oob-muted)] leading-relaxed">
              Out Of Bounds nace de la obsesión por el detalle: tejidos que respiran en el recorrido largo,
              cortes que acompañan el movimiento y una estética sobria que funciona tanto en el tee como en la ciudad.
              Cada pieza equilibra función y silueta, porque el golf de hoy no entiende de compromisos.
            </p>
            <ul className="mt-8 space-y-3 text-sm text-[var(--oob-cream)]/90">
              <li className="flex gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--oob-gold)]" />
                Materiales premium y acabados duraderos
              </li>
              <li className="flex gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--oob-gold)]" />
                Diseño pensado para el rendimiento real en campo
              </li>
              <li className="flex gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--oob-gold)]" />
                Estética atemporal, lejos del ruido visual
              </li>
            </ul>
            <Link
              href="/acerca"
              className="mt-10 inline-flex items-center text-sm font-semibold uppercase tracking-wider text-[var(--oob-fairway)] hover:text-[var(--oob-gold)] transition-colors underline-offset-4 hover:underline"
            >
              Acerca de nosotros
            </Link>
          </div>
        </div>
      </div>
    </GsapReveal>
  );
}

import Image from "next/image";
import Link from "next/link";
import { GsapReveal } from "./GsapReveal";
import { mergeFeaturedCollections } from "@/lib/collection-utils";

export function FeaturedCollections({ collections }) {
  const items = mergeFeaturedCollections(collections);

  return (
    <GsapReveal as="section" className="py-20 md:py-28 border-b border-[color:var(--oob-border)]">
      <div className="oob-container">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--oob-gold)] mb-3">
              Colecciones destacadas
            </p>
            <h2 className="oob-heading-xl text-3xl md:text-4xl text-[var(--oob-cream)]">
              Cuatro mundos, un mismo estándar
            </h2>
          </div>
          <p className="text-sm text-[var(--oob-muted)] max-w-sm md:text-right">
            Explora las líneas esenciales de la temporada: siluetas técnicas y acabados premium.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {items.map((col, i) => (
            <Link
              key={col.id}
              href={
                col.placeholder === true || String(col.id ?? "").startsWith("ph-")
                  ? "/collections"
                  : `/collections/${col.handle}`
              }
              className={`group relative overflow-hidden rounded-lg border border-[color:var(--oob-border)] aspect-[4/5] ${
                i === 1 ? "lg:mt-8" : i === 3 ? "lg:mt-8" : ""
              }`}
            >
              {col.image?.url ? (
                <Image
                  src={col.image.url}
                  alt={col.image.altText || col.title}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, 25vw"
                />
              ) : (
                <div
                  className="absolute inset-0 bg-gradient-to-br from-[var(--oob-fairway)]/40 via-[var(--oob-bg-elevated)] to-[var(--oob-bg)]"
                  aria-hidden
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--oob-bg)] via-[var(--oob-bg)]/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--oob-gold)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-1 oob-heading-xl text-xl md:text-2xl text-[var(--oob-cream)] group-hover:text-[var(--oob-gold)] transition-colors">
                  {col.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </GsapReveal>
  );
}

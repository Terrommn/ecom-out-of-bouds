import Image from "next/image";
import Link from "next/link";
import { getCollectionsCatalog } from "@/lib/shopify";

export const metadata = {
  title: "Colecciones | Out Of Bounds",
  description: "Explora todas las colecciones de ropa y accesorios de golf.",
};

function collectionItemClasses(index) {
  const base =
    "group relative flex h-full min-h-[13rem] flex-col overflow-hidden bg-[var(--oob-bg)] transition-[outline-color] duration-200 hover:z-[1] hover:outline hover:outline-1 hover:-outline-offset-1 hover:outline-[color:rgba(225,192,113,0.5)] focus-visible:z-[1] focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-[var(--oob-gold)]";

  if (index === 0) {
    return `${base} lg:col-span-8 lg:row-span-2 lg:row-start-1 lg:col-start-1 lg:min-h-[min(72vh,38rem)]`;
  }
  if (index === 1) {
    return `${base} lg:col-span-4 lg:row-start-1 lg:col-start-9 lg:min-h-[min(36vh,19rem)]`;
  }
  if (index === 2) {
    return `${base} lg:col-span-4 lg:row-start-2 lg:col-start-9 lg:min-h-[min(36vh,19rem)]`;
  }
  return `${base} lg:col-span-4 lg:min-h-[14rem]`;
}

export default async function CollectionsIndexPage() {
  const collections = await getCollectionsCatalog(48);

  return (
    <div className="relative border-b border-[color:var(--oob-border)]">
      {/* Cabecera editorial */}
      <header className="oob-container border-b border-[color:var(--oob-border)] py-10 md:py-14">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="hidden lg:col-span-1 lg:flex lg:flex-col lg:items-center lg:justify-start lg:pt-1">
            <p className="font-mono text-[10px] uppercase tracking-[0.55em] text-[var(--oob-muted)] [writing-mode:vertical-rl] [text-orientation:mixed] rotate-180">
              Catálogo
            </p>
          </div>

          <div className="lg:col-span-7 lg:col-start-2">
            <div className="mb-5 flex flex-wrap items-center gap-3">
              <span className="inline-block h-px w-10 bg-[var(--oob-gold)]" aria-hidden />
              <span className="font-mono text-[11px] font-medium uppercase tracking-[0.4em] text-[var(--oob-gold)]">
                Tienda · índice
              </span>
            </div>
            <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.35em] text-[var(--oob-muted)]">
              Out Of Bounds · todas las líneas
            </p>
            <h1 className="oob-heading-xl text-4xl text-[var(--oob-cream)] md:text-5xl lg:text-[3.25rem]">
              Colecciones
            </h1>
            <div className="mt-8 flex max-w-xl items-center gap-4">
              <span
                className="h-px flex-1 max-w-[6rem] bg-gradient-to-r from-[var(--oob-gold)] to-transparent"
                aria-hidden
              />
              <span className="font-mono text-[9px] uppercase tracking-[0.45em] text-[var(--oob-muted)]">
                Golf · estilo · rendimiento
              </span>
            </div>
            <p className="mt-8 max-w-xl text-base leading-[1.65] text-[var(--oob-muted)] md:text-[1.05rem]">
              Ropa de hombre, mujer, accesorios y ediciones especiales — presentadas como en un índice de
              revista: sin relleno visual, solo tipografía y fotografía.
            </p>
          </div>

          <aside className="border border-[color:var(--oob-border)] bg-[var(--oob-bg-elevated)] p-6 md:p-7 lg:col-span-4 lg:col-start-9">
            <p className="font-mono text-[9px] uppercase tracking-[0.45em] text-[var(--oob-gold)]">
              En esta sección
            </p>
            <ul className="mt-5 space-y-3 border-t border-[color:var(--oob-border)] pt-5 font-serif text-[1.05rem] leading-snug text-[var(--oob-cream)] md:text-lg">
              <li className="flex gap-3">
                <span className="font-mono text-[11px] text-[var(--oob-muted)]">I</span>
                <span>Siluetas para fairway y clubhouse</span>
              </li>
              <li className="flex gap-3">
                <span className="font-mono text-[11px] text-[var(--oob-muted)]">II</span>
                <span>Tejidos técnicos con acabado limpio</span>
              </li>
              <li className="flex gap-3">
                <span className="font-mono text-[11px] text-[var(--oob-muted)]">III</span>
                <span>Accesorios que cierran el look</span>
              </li>
            </ul>
          </aside>
        </div>
      </header>

      <div className="oob-container py-10 md:py-12">
        {collections.length === 0 ? (
          <p className="text-[var(--oob-muted)]">
            No hay colecciones públicas. Configura Shopify o añade colecciones en el admin.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-px bg-[color:var(--oob-border)] lg:grid-cols-12">
            {collections.map((col, index) => (
              <Link
                key={col.id}
                href={`/collections/${col.handle}`}
                className={collectionItemClasses(index)}
              >
                {col.image?.url ? (
                  <Image
                    src={col.image.url}
                    alt={col.image.altText || col.title}
                    fill
                    className="object-cover transition duration-700 group-hover:opacity-95"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                ) : (
                  <div
                    className="absolute inset-0 bg-[linear-gradient(135deg,var(--oob-bg-elevated)_0%,var(--oob-surface)_100%)]"
                    aria-hidden
                  />
                )}
                <div
                  className="absolute inset-0 bg-gradient-to-t from-[var(--color-mighty-green)]/90 via-[var(--color-mighty-green)]/25 to-transparent"
                  aria-hidden
                />
                <div className="relative mt-auto flex flex-col justify-end p-5 md:p-6 lg:p-7">
                  <span className="mb-2 font-mono text-[10px] uppercase tracking-[0.35em] text-white/55">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h2 className="oob-heading-xl max-w-[20ch] text-xl leading-[1.08] text-white md:text-2xl lg:text-[1.65rem]">
                    {col.title}
                  </h2>
                  <span className="mt-4 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.28em] text-[var(--oob-gold)]">
                    Ver línea
                    <span aria-hidden className="transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

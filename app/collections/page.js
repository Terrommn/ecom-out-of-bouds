import Image from "next/image";
import Link from "next/link";
import { getCollectionsCatalog } from "@/lib/shopify";

export const metadata = {
  title: "Colecciones | Out Of Bounds",
  description: "Explora todas las colecciones de Out Of Bounds.",
};

export default async function CollectionsIndexPage() {
  const collections = await getCollectionsCatalog(48);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <header className="relative flex items-center justify-center h-[40vh] md:h-[50vh] overflow-hidden border-b border-[color:var(--oob-border)]">
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--oob-bg)] via-[var(--oob-bg-elevated)] to-[var(--oob-bg)]" />
        <div className="relative text-center px-6">
          <h1 className="oob-heading-xl text-5xl md:text-7xl text-[var(--oob-cream)]">
            Colecciones
          </h1>
          <p className="mt-4 font-mono text-xs uppercase tracking-[0.4em] text-[var(--oob-muted)]">
            Out Of Bounds
          </p>
        </div>
      </header>

      {/* Grid */}
      <div className="oob-container py-12 md:py-16">
        {collections.length === 0 ? (
          <p className="text-center text-[var(--oob-muted)] py-20">
            No hay colecciones disponibles.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {collections.map((col) => (
              <Link
                key={col.id}
                href={`/collections/${col.handle}`}
                className="group relative aspect-[4/5] overflow-hidden rounded-sm bg-[var(--oob-bg-elevated)]"
              >
                {col.image?.url ? (
                  <Image
                    src={col.image.url}
                    alt={col.image.altText || col.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-[var(--oob-bg-elevated)] to-[var(--oob-surface)]" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h2 className="oob-heading-xl text-2xl md:text-3xl text-white">
                    {col.title}
                  </h2>
                  <span className="mt-3 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--oob-gold)] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Explorar →
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

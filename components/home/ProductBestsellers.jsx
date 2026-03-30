import { GsapReveal } from "./GsapReveal";
import { ProductCard } from "./ProductCard";
import { mergeBestsellerProducts } from "@/lib/product-utils";

export function ProductBestsellers({ products }) {
  const items = mergeBestsellerProducts(products);

  return (
    <GsapReveal as="section" className="py-20 md:py-28 border-b border-[color:var(--oob-border)]">
      <div className="oob-container">
        <div className="mb-12 md:mb-16 max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--oob-gold)] mb-3">
            Bestsellers
          </p>
          <h2 className="oob-heading-xl text-3xl md:text-4xl text-[var(--oob-cream)]">
            Lo más elegido en el club
          </h2>
          <p className="mt-4 text-[var(--oob-muted)] text-sm md:text-base">
            Piezas con mejor valoración: materiales técnicos, cortes limpios y detalles que marcan la diferencia en el swing.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {items.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </GsapReveal>
  );
}

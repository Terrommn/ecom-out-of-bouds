import { PLACEHOLDER_PRODUCTS } from "@/lib/placeholders";

/**
 * Exactly 8 products for the homepage grid; fills with placeholders.
 */
export function mergeBestsellerProducts(apiProducts) {
  const out = [...(apiProducts || [])];
  for (const p of PLACEHOLDER_PRODUCTS) {
    if (out.length >= 8) break;
    if (!out.some((x) => x.handle === p.handle)) out.push(p);
  }
  let i = 0;
  while (out.length < 8) {
    const p = PLACEHOLDER_PRODUCTS[i % PLACEHOLDER_PRODUCTS.length];
    out.push({ ...p, id: `${p.id}-fill-${out.length}-${i}` });
    i += 1;
  }
  return out.slice(0, 8);
}

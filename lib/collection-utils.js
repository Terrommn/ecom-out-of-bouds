import { PLACEHOLDER_COLLECTIONS } from "@/lib/placeholders";

/**
 * Up to 4 collections for the homepage; pads with placeholders by handle.
 */
export function mergeFeaturedCollections(apiCollections) {
  const out = [...(apiCollections || [])];
  for (const p of PLACEHOLDER_COLLECTIONS) {
    if (out.length >= 4) break;
    if (!out.some((c) => c.handle === p.handle)) {
      out.push(p);
    }
  }
  return out.slice(0, 4);
}

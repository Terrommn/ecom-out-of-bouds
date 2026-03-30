import { Hero } from "@/components/home/Hero";
import { FeaturedCollections } from "@/components/home/FeaturedCollections";
import { ProductBestsellers } from "@/components/home/ProductBestsellers";
import { BrandStory } from "@/components/home/BrandStory";
import { Testimonials } from "@/components/home/Testimonials";
import { NewsletterSocial } from "@/components/home/NewsletterSocial";
import { getCollectionsFirst, getProductsFirst } from "@/lib/shopify";

export default async function Home() {
  const [collections, products] = await Promise.all([
    getCollectionsFirst(4),
    getProductsFirst(8),
  ]);

  return (
    <>
      <Hero />
      <FeaturedCollections collections={collections} />
      <ProductBestsellers products={products} />
      <BrandStory />
      <Testimonials />
      <NewsletterSocial />
    </>
  );
}

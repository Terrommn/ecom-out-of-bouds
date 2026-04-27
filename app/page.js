import { Hero } from "@/components/home/Hero";
import { ProductBestsellers } from "@/components/home/ProductBestsellers";
import { BrandStory } from "@/components/home/BrandStory";
import { NewsletterSocial } from "@/components/home/NewsletterSocial";
import { getProductsFirst } from "@/lib/shopify";

export default async function Home() {
  const products = await getProductsFirst(8);

  return (
    <>
      <Hero />
      <ProductBestsellers products={products} />
      <BrandStory />
      <NewsletterSocial />
    </>
  );
}

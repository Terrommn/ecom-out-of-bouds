# Headless Shopify storefront (Next.js 15)

Standard Next.js App Router + [Shopify Storefront GraphQL API](https://shopify.dev/docs/api/storefront) (public access token). No Hydrogen, Hydrogen React, Remix, or Liquid.

## Setup

1. From this project folder (`shopify-headless-storefront/`), copy `.env.example` to `.env.local` and fill in:

   - `SHOPIFY_STORE_DOMAIN` — hostname only (e.g. `your-store.myshopify.com`). You can paste a full `https://` URL; it is normalized automatically.
   - `SHOPIFY_STOREFRONT_ACCESS_TOKEN` — public token from the Headless channel / Storefront API
   - `NEXT_PUBLIC_SITE_URL` — site URL for metadata (e.g. `http://localhost:3000` locally, `https://your-app.vercel.app` in production)

2. Install and run:

   ```bash
   npm install
   npm run dev
   ```

   After creating or editing `.env.local`, stop and restart `npm run dev` so Next.js reloads environment variables.

3. Optional: `MAX_PRODUCTS` caps how many products are fetched when loading the home page (default 500).

### Using the same store as a Hydrogen project

This template is **not** Hydrogen, but it uses the same **Storefront API** public credentials:

| Your Hydrogen / `env pull` variable | Set in this app as |
| --- | --- |
| `PUBLIC_STORE_DOMAIN` | `SHOPIFY_STORE_DOMAIN` |
| `PUBLIC_STOREFRONT_API_TOKEN` | `SHOPIFY_STOREFRONT_ACCESS_TOKEN` |

Use the **public** storefront token only. Do **not** use `PRIVATE_STOREFRONT_API_TOKEN` or any `shpat_` Admin token for `SHOPIFY_STOREFRONT_ACCESS_TOKEN` — that is a different API.

You do not need `SESSION_SECRET`, `PUBLIC_STOREFRONT_ID`, Customer Account API vars, or `SHOP_ID` for the features in this starter.

### Storefront API 401 (Unauthorized)

That response means Shopify rejected the token for the Storefront endpoint. Typical causes:

1. **Wrong token** — `SHOPIFY_STOREFRONT_ACCESS_TOKEN` must be the **Storefront API public access token** (Headless / Hydrogen `PUBLIC_STOREFRONT_API_TOKEN`). **Do not** use `PRIVATE_STOREFRONT_API_TOKEN` or any **`shpat_…`** Admin API token.
2. **Wrong store** — `SHOPIFY_STORE_DOMAIN` must be the **same** `.myshopify.com` store that created that Headless token.
3. **Quotes / spaces** — In `.env.local`, don’t wrap the token in quotes unless the whole value is quoted once; avoid trailing spaces.
4. **API version** — If it still fails, set `SHOPIFY_STOREFRONT_API_VERSION=2024-10` and restart the dev server.

Regenerate or copy the Storefront token from **Shopify Admin → Settings → Apps and sales channels →** your headless storefront / development store.

## Deploy on Vercel

1. Push the project to Git and import it in [Vercel](https://vercel.com).
2. Add the same environment variables in **Project → Settings → Environment Variables**.
3. Deploy. No special build command beyond `npm run build`.

## Project structure

- `lib/shopify.js` — GraphQL client and queries/mutations
- `app/actions/cart.js` — server actions for cart operations
- `app/page.js` — product grid
- `app/[handle]/page.js` — product detail + `generateMetadata`
- `app/cart/page.js` — full cart page
- `components/` — `Navbar`, `ProductCard`, `Cart` (drawer), `CartProvider`, `ProductAddToCart`
# ecom-out-of-bouds

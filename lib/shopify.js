import { GraphQLClient } from "graphql-request";

const API_VERSION = "2025-01";

function getClient() {
  const domain = process.env.SHOPIFY_STORE_DOMAIN;
  const token = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;
  if (!domain || !token) {
    throw new Error(
      "Missing SHOPIFY_STORE_DOMAIN or SHOPIFY_STOREFRONT_ACCESS_TOKEN",
    );
  }
  const endpoint = `https://${domain}/api/${API_VERSION}/graphql.json`;
  return new GraphQLClient(endpoint, {
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": token,
    },
  });
}

async function storefrontRequest(query, variables = {}) {
  const client = getClient();
  return client.request(query, variables);
}

const PRODUCT_CARD_FRAGMENT = `
  fragment ProductCardFields on Product {
    id
    handle
    title
    featuredImage {
      url
      altText
      width
      height
    }
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
      maxVariantPrice {
        amount
        currencyCode
      }
    }
    variants(first: 100) {
      edges {
        node {
          id
          title
          availableForSale
          price {
            amount
            currencyCode
          }
          selectedOptions {
            name
            value
          }
        }
      }
    }
  }
`;

const PRODUCTS_PAGE_QUERY = `
  ${PRODUCT_CARD_FRAGMENT}
  query ProductsPage($first: Int!, $after: String) {
    products(first: $first, after: $after) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        cursor
        node {
          ...ProductCardFields
        }
      }
    }
  }
`;

/**
 * Fetch all products (paginated server-side). Stops at MAX_PRODUCTS if set.
 */
export async function getProducts() {
  const max = Number(process.env.MAX_PRODUCTS) || 500;
  const pageSize = 50;
  const all = [];
  let after = null;

  while (all.length < max) {
    const first = Math.min(pageSize, max - all.length);
    const data = await storefrontRequest(PRODUCTS_PAGE_QUERY, {
      first,
      after,
    });
    const conn = data.products;
    for (const edge of conn.edges) {
      all.push(edge.node);
    }
    if (!conn.pageInfo.hasNextPage || conn.edges.length === 0) break;
    after = conn.pageInfo.endCursor;
  }

  return all;
}

const PRODUCT_BY_HANDLE_QUERY = `
  query ProductByHandle($handle: String!) {
    product(handle: $handle) {
      id
      title
      descriptionHtml
      handle
      availableForSale
      images(first: 20) {
        edges {
          node {
            id
            url
            altText
            width
            height
          }
        }
      }
      featuredImage {
        url
        altText
        width
        height
      }
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
        maxVariantPrice {
          amount
          currencyCode
        }
      }
      variants(first: 100) {
        edges {
          node {
            id
            title
            availableForSale
            quantityAvailable
            price {
              amount
              currencyCode
            }
            image {
              url
              altText
              width
              height
            }
            selectedOptions {
              name
              value
            }
          }
        }
      }
    }
  }
`;

export async function getProductByHandle(handle) {
  const data = await storefrontRequest(PRODUCT_BY_HANDLE_QUERY, { handle });
  return data.product ?? null;
}

const CART_FRAGMENT = `
  fragment CartFields on Cart {
    id
    checkoutUrl
    totalQuantity
    cost {
      totalAmount {
        amount
        currencyCode
      }
      subtotalAmount {
        amount
        currencyCode
      }
    }
    lines(first: 100) {
      edges {
        node {
          id
          quantity
          merchandise {
            ... on ProductVariant {
              id
              title
              availableForSale
              image {
                url
                altText
                width
                height
              }
              price {
                amount
                currencyCode
              }
              product {
                title
                handle
              }
            }
          }
        }
      }
    }
  }
`;

const GET_CART_QUERY = `
  ${CART_FRAGMENT}
  query GetCart($cartId: ID!) {
    cart(id: $cartId) {
      ...CartFields
    }
  }
`;

export async function getCart(cartId) {
  const data = await storefrontRequest(GET_CART_QUERY, { cartId });
  return data.cart ?? null;
}

const CART_CREATE_MUTATION = `
  ${CART_FRAGMENT}
  mutation CartCreate($input: CartInput) {
    cartCreate(input: $input) {
      cart {
        ...CartFields
      }
      userErrors {
        field
        message
        code
      }
    }
  }
`;

export async function createCart(lines = []) {
  const input =
    lines.length > 0
      ? {
          lines: lines.map((l) => ({
            merchandiseId: l.merchandiseId,
            quantity: l.quantity,
          })),
        }
      : {};
  const data = await storefrontRequest(CART_CREATE_MUTATION, { input });
  return {
    cart: data.cartCreate?.cart ?? null,
    userErrors: data.cartCreate?.userErrors ?? [],
  };
}

const CART_LINES_ADD_MUTATION = `
  ${CART_FRAGMENT}
  mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        ...CartFields
      }
      userErrors {
        field
        message
        code
      }
    }
  }
`;

export async function addToCart(cartId, lines) {
  const data = await storefrontRequest(CART_LINES_ADD_MUTATION, {
    cartId,
    lines: lines.map((l) => ({
      merchandiseId: l.merchandiseId,
      quantity: l.quantity,
    })),
  });
  return {
    cart: data.cartLinesAdd?.cart ?? null,
    userErrors: data.cartLinesAdd?.userErrors ?? [],
  };
}

const CART_LINES_UPDATE_MUTATION = `
  ${CART_FRAGMENT}
  mutation CartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart {
        ...CartFields
      }
      userErrors {
        field
        message
        code
      }
    }
  }
`;

export async function updateCart(cartId, lines) {
  const data = await storefrontRequest(CART_LINES_UPDATE_MUTATION, {
    cartId,
    lines: lines.map((l) => ({
      id: l.id,
      quantity: l.quantity,
    })),
  });
  return {
    cart: data.cartLinesUpdate?.cart ?? null,
    userErrors: data.cartLinesUpdate?.userErrors ?? [],
  };
}

const CART_LINES_REMOVE_MUTATION = `
  ${CART_FRAGMENT}
  mutation CartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart {
        ...CartFields
      }
      userErrors {
        field
        message
        code
      }
    }
  }
`;

export async function removeCartLines(cartId, lineIds) {
  const data = await storefrontRequest(CART_LINES_REMOVE_MUTATION, {
    cartId,
    lineIds,
  });
  return {
    cart: data.cartLinesRemove?.cart ?? null,
    userErrors: data.cartLinesRemove?.userErrors ?? [],
  };
}

# Plan maestro: completar el sitio según el PDF «Estructura Tienda Shopify Out Of Bounds»

Documento de referencia: [Estructura Tienda Shopify Out Of Bounds (2).pdf](file:///home/terrommn/Downloads/Estructura%20Tienda%20Shopify%20Out%20Of%20Bounds%20(2).pdf).

**Estado actual del repo (resumen):** ya existe la **home** (`/`) con secciones tipo 1.x, **header/footer/announcement** tipo 8.x parcial, integración **Shopify Storefront API** en `lib/shopify.js` (productos, carrito básico). **Faltan** la mayoría de rutas (`/collections/[handle]`, `/products/[handle]`, `/cart`, checkout, páginas legales/institucionales, cuenta, búsqueda avanzada, wishlist, reseñas tipo Judge.me, etc.).

**Cómo usar este archivo:** cada bloque tiene un **Prompt gigante (copiar/pegar)** para abrir otra conversión de planificación o implementación en Cursor: pégalo tal cual (o ajusta prioridades) y pide que genere tareas o código.

---

## 0. Convenciones globales (hazlo una vez o al inicio de cada fase)

- **Stack:** Next.js App Router, React, Tailwind, `lib/shopify.js`, variables `SHOPIFY_STORE_DOMAIN` y `SHOPIFY_STOREFRONT_ACCESS_TOKEN`.
- **Idioma UI:** español; marca **Out Of Bounds**, golf de lujo (paleta oscura + dorado ya definida en `app/globals.css`).
- **Rutas:** coherentes con los enlaces del footer/header (`/acerca`, `/contacto`, `/faq`, `/envios`, `/devoluciones`, `/privacidad`, `/terminos`, `/collections/...`, `/products/...`, `/cart`, `/account`).

### Prompt gigante — Fundaciones y orden de implementación

```
Contexto: Proyecto Next.js 15 headless Shopify en la carpeta del repo. Ya existen app/page.js (home), app/layout.js, components/layout/*, lib/shopify.js con Storefront API, app/globals.css con tema golf de lujo.

Objetivo: Definir el ORDEN de implementación de todas las rutas y features del PDF «Estructura Tienda Shopify Out Of Bounds», minimizando retrabajo. El PDF pide: home completa, catálogo/colecciones/PDP, páginas institucionales, servicio al cliente (FAQ, envíos, devoluciones, privacidad, términos), cuenta, carrito/checkout, navegación global, búsqueda, wishlist, reseñas (Judge.me).

Tareas para ti (planificador):
1) Lista en orden lógico de dependencias (ej. carrito antes de checkout; PDP antes de «complementarios»; políticas legales como páginas estáticas en paralelo).
2) Por cada entregable, nombra rutas App Router (`app/.../page.js`) y archivos a tocar o crear.
3) Indica qué parte es solo contenido legal/marketing vs qué parte requiere GraphQL Shopify adicional (cart lines, checkout URL, búsqueda predictiva, etc.).
4) Señala riesgos: límites de Storefront API, checkout alojado en Shopify vs extensión, OAuth para login social, Judge.me como app de terceros.
5) Propón criterios de «hecho» (definition of done) por página.

No escribas código todavía; solo un plan ejecutable en fases numeradas.
```

---

## 1. Página de inicio (Homepage) — secciones 1.1 a 1.6

**Estado:** parcialmente cubierta. Revisar gaps respecto al PDF.

- [ ] **1.1 Hero:** banner/video lifestyle real (asset), opción **video de fondo** si hay archivo; mantener CTA «Descubre la Colección».
- [ ] **1.2 Colecciones destacadas:** alineación con colecciones reales en Shopify (handles Hombre/Mujer/Accesorios/Nueva temporada).
- [ ] **1.3 Bestsellers:** carrusel opcional + etiquetas «Más vendido»/«Nuevo» desde metafields o tagging en Shopify.
- [ ] **1.4 Sobre la marca:** imagen/video real + enlace a `/acerca`.
- [ ] **1.5 Testimonios:** fotos UGC, integración futura con reseñas (sección 9.3).
- [ ] **1.6 Newsletter:** backend (Klaviyo/Shopify Email/Omnisend) o acción server; **feed Instagram** (embed o API).

### Prompt gigante — Refinar home según PDF

```
Revisa la home existente de Out Of Bounds (Next.js): Hero, FeaturedCollections, ProductBestsellers, BrandStory, Testimonials, NewsletterSocial.

Según el PDF secciones 1.1–1.6, lista gaps concretos: video hero, feed Instagram, newsletter con backend, bestsellers con badges desde Shopify (metafields o collections), testimonios con imágenes UGC.

Propón cambios mínimos por archivo (rutas bajo components/home/ y app/page.js). Incluye si hace falta nueva query GraphQL en lib/shopify.js. Entrega checklist priorizado (P0/P1/P2) y prompts de implementación por ítem.
```

---

## 2. Catálogo de productos (estructura y PDP) — sección 2

### 2.1 Categorías principales

- [ ] Entradas claras: **Ropa Hombre**, **Ropa Mujer**, **Accesorios**, **Colecciones especiales** (colecciones Shopify o menú de navegación).

### 2.2 Página individual de producto (PDP)

- [ ] Galería (≥5 imágenes si el catálogo las tiene; fallback con lo disponible).
- [ ] Título, precio, compare-at, selector de **variantes** (color/talla).
- [ ] Descripción, metafields para **ficha técnica** (material, cuidados).
- [ ] Stock / disponibilidad.
- [ ] **Agregar al carrito** (mutaciones ya en lib o ampliar).
- [ ] Bloques envío/devolución (enlaces a políticas).

### Prompt gigante — PDP + datos Shopify

```
Implementa la ruta app/products/[handle]/page.js para storefront headless Next.js + Shopify Storefront API.

Requisitos del PDF sección 2.2: galería múltiple, título, precio con descuento si compareAtPrice, selector de variantes con cambio de imagen/precio, descripción HTML, características técnicas (prefer metafields), disponibilidad, botón añadir al carrito, enlaces a envíos/devoluciones.

Usa lib/shopify.js: extiende getProductByHandle si hace falta (metafields, compareAt). Carrito: cookie o localStorage de cartId + createCart/addToCart. Server Components donde sea posible; cliente para galería y add to cart.

Entrega: lista de archivos nuevos, queries GraphQL, manejo de errores 404, accesibilidad básica, diseño alineado al tema oscuro/dorado existente.
```

---

## 3. Páginas de colección — sección 3

- [ ] **3.1:** Banner, breadcrumbs, conteo de productos, grid 2/3/4 cols + **vista lista**.
- [ ] **3.2:** Filtros precio (rango), color, tipo, disponibilidad; ordenación (precio, alfabético, novedad, etc.).

**Nota técnica:** Storefront API usa `filters` en `collection` cuando la API versión lo soporta; puede requerir **paginación** y estado en URL (`?sort=`, `?filter=`).

### Prompt gigante — Colección + filtros + ordenación

```
Diseña e implementa app/collections/[handle]/page.js (+ loading/error) para colecciones Shopify.

PDF sección 3: banner con imagen de colección, breadcrumbs (Inicio > …), total de productos, grid responsive con toggle lista/cuadrícula, filtros por precio (slider), color, tipo de producto, disponibilidad, y sort: destacados, precio asc/desc, alfabético, más nuevo, más vendido (los últimos pueden depender de sort keys disponibles en Storefront API).

Incluye: sincronización de estado con searchParams, paginación «cargar más» o páginas, empty state, SEO title/description. Documenta limitaciones de filtros vs Admin (product_type, tags, etc.).

Prioriza plan en pasos antes de código completo.
```

---

## 4. Páginas institucionales — sección 4

### 4.1 Acerca de nosotros — `/acerca`

- [ ] Historia, fundadores, misión/visión/valores, proceso de diseño, calidad, galería, video opcional.

### 4.2 Contacto — `/contacto`

- [ ] Formulario (nombre, email, teléfono, mensaje), datos de contacto, WhatsApp, dirección, **mapa Google**, horarios, redes, FAQ rápido (enlaces internos).

### Prompt gigante — Institucionales (contenido + formulario)

```
Crea las rutas app/acerca/page.js y app/contacto/page.js para Out Of Bounds.

PDF 4.1: secciones narrativas + galería + bloque video opcional (iframe o componente que acepta URL).

PDF 4.2: formulario de contacto con validación accesible; en envío, opciones: (A) mailto, (B) API Route que reenvía con Resend/SendGrid, (C) formulario de Shopify (si existe). Mapa: Google Maps embed (iframe) con variable NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL o coordenadas. Incluye bloque horarios y enlaces a /faq.

Mantén diseño consistente con globals.css. Entrega plan de contenido placeholder en español y checklist legal (no prometer lo que la marca no pueda cumplir).
```

---

## 5. Servicio al cliente y legales — sección 5

| Ruta sugerida   | Contenido PDF                          |
|-----------------|----------------------------------------|
| `/faq`          | 5.1 FAQ por categorías                 |
| `/envios`       | 5.3 Política de envíos                 |
| `/devoluciones` | 5.4 Devoluciones y cambios             |
| `/privacidad`   | 5.5 Privacidad                         |
| `/terminos`     | 5.6 Términos y condiciones             |

*(El PDF salta el número **5.2**; no hay subsección 5.2 en el documento.)*

- [ ] FAQ acordeón por categorías del PDF.
- [ ] Páginas legales: texto revisable por el negocio (plantillas + disclaimers).
- [ ] Formulario de devolución (PDF 5.4): enlace o formulario que genere ticket (email/CRM).

### Prompt gigante — FAQ + páginas legales

```
Implementa páginas estáticas Next.js para Out Of Bounds: /faq, /envios, /devoluciones, /privacidad, /terminos.

Contenido: sigue la lista del PDF secciones 5.1, 5.3–5.6. FAQ: acordeón accesible con secciones Pedidos, Envíos, Devoluciones, Tallas, Pagos, Cuidado de productos, Cuenta. Legales: encabezados claros, última actualización, texto placeholder en español marcado [REVISAR LEGAL].

Incluye componente compartido LegalLayout (tabla de contenidos opcional móvil). Footer ya enlaza a estas rutas: verifica consistencia.

Entrega estructura de archivos bajo app/ y componentes reutilizables; no inventes cláusulas legales definitivas — deja TODO REVISIÓN JURÍDICA donde corresponda.
```

---

## 6. Sistema de cuenta — sección 6

- [ ] Registro email/contraseña, login, recuperación de contraseña.
- [ ] Registro social Google/Facebook (Shopify Customer Account API / OAuth — **complejidad alta**).

**Nota:** El login clásico «Customer» en headless suele usar **Customer Account API** (Hydrogen patterns) o **Multipass** / app personalizada. Documentar enfoque antes de implementar.

### Prompt gigante — Cuenta de cliente (decisión de arquitectura)

```
El PDF sección 6 pide registro/login, social login y recuperación de contraseña en un storefront Next.js headless con Shopify.

Explica opciones: (1) redirigir a dominio de cuentas de Shopify, (2) Customer Account API + OAuth, (3) multipass solo B2B legacy. Para Out Of Bounds, recomienda una opción con esfuerzo razonable.

Entrega plan por fases: MVP (enlace «Mi cuenta» a Shopify account URL) vs fase completa (OAuth). Lista variables de entorno, implicaciones de cookies, y rutas app/account/* mínimas (login placeholder, orders placeholder).
```

---

## 7. Carrito y checkout — sección 7

### 7.1 Carrito — `/cart`

- [ ] Líneas con imagen, título, precio, cantidad, eliminar.
- [ ] Código descuento (si Storefront lo permite en tu flujo).
- [ ] Estimador de envío (API o enlace a checkout).
- [ ] Totales, upsell, barra envío gratis.

### 7.2 Checkout

- [ ] Redirección a `cart.checkoutUrl` de Shopify **o** Checkout Extensibility / función server.

### Prompt gigante — Carrito completo + checkout

```
Implementa app/cart/page.js y flujo de carrito persistente: cartId en cookie httpOnly o secure cookie, crear carrito vacío, add/update/remove líneas usando lib/shopify.js.

PDF 7.1: UI completa, cupón si aplica (cartDiscountCodesUpdate o nota de limitación), estimación de envío (documentar si solo es posible en checkout Shopify), cross-sell de productos relacionados (query recommendations o collection), barra de progreso para envío gratis (umbral en env o metafield tienda).

PDF 7.2: botón «Proceder al pago» debe usar checkoutUrl del carrito Storefront. Explica qué NO se puede personalizar sin Shopify Plus.

Lista archivos, hooks cliente vs servidor, y estados vacío/error.
```

---

## 8. Navegación del sitio — sección 8

- [ ] **8.1 Header:** ya parcial; añadir **selector de idioma** si aplica (i18n).
- [ ] **8.2 Móvil:** categorías expandibles, servicio al cliente (enlaces).
- [ ] **8.3 Footer:** ya con 4 columnas; mantener enlaces al completar rutas.

### Prompt gigante — Navegación e i18n

```
Mejora SiteHeader/SiteFooter de Out Of Bounds según PDF sección 8: menú categorías alineado con colecciones reales, búsqueda que lleve a /search?q=, iconos cuenta/carrito con contador de líneas del carrito, announcement bar editable por env.

Menú móvil: acordeón por categorías + enlaces legales/servicio. Opcional: selector de idioma ES/EN con next-intl o prefijo [locale] — evalúa complejidad y entrega plan antes de refactor grande.

Incluye checklist de accesibilidad (focus trap en menú móvil, aria-current en nav).
```

---

## 9. Funcionalidades adicionales — sección 9

### 9.1 Búsqueda inteligente — `/search`

- [ ] Resultados de productos, filtros, estado «sin resultados».

### 9.2 Wishlist

- [ ] Persistencia (localStorage + sync opcional), compartir URL, alertas (complejo), add to cart desde wishlist.

### 9.3 Reseñas (Judge.me u otra app)

- [ ] Widget embed o API pública de la app; estrellas en PDP y home.

### Prompt gigante — Búsqueda, wishlist y reseñas

```
Planifica tres features para el mismo repo Next.js + Shopify:

9.1 Búsqueda: ruta app/search/page.js usando query search products en Storefront API; filtros laterales; empty state.

9.2 Wishlist: sin backend propio, MVP con localStorage (lista de handles) y página /wishlist; opcional cuenta más adelante.

9.3 Judge.me: investiga integración típica (script widget vs API); dónde insertar en PDP y home; impacto en Core Web Vitals.

Entrega priorización (P0–P2), riesgos, y orden sugerido de implementación.
```

---

## Lista rápida: rutas a crear (checklist)

Usa esto como **sub-lista** global; marca según avances.

- [ ] `/` — home (refinar vs PDF)
- [ ] `/collections/[handle]` — listado colección
- [ ] `/products/[handle]` — PDP
- [ ] `/search` — búsqueda
- [ ] `/cart` — carrito
- [ ] Checkout — vía URL Shopify (`checkoutUrl`)
- [ ] `/acerca` — sobre nosotros
- [ ] `/contacto` — contacto
- [ ] `/faq` — FAQ
- [ ] `/envios` — envíos
- [ ] `/devoluciones` — devoluciones
- [ ] `/privacidad` — privacidad
- [ ] `/terminos` — términos
- [ ] `/account` o subrutas — cuenta (según arquitectura elegida)
- [ ] `/wishlist` — deseos (opcional MVP)

---

## Prompt gigante final — Plan único de «todo el PDF»

```
Eres un planificador técnico. Tengo un PDF de estructura de tienda Shopify para la marca Out Of Bounds (golf de lujo) con secciones 1–9: home, catálogo/PDP, colecciones con filtros, institucionales, servicio/legales, cuenta, carrito/checkout, navegación, búsqueda, wishlist, reseñas Judge.me.

El código actual es Next.js App Router con lib/shopify.js y home ya implementada. Necesito un roadmap en fases (Sprint 1, 2, 3…) con entregables verificables, dependencias entre tareas, y qué queda fuera si no hay Shopify Plus o sin Customer Account API.

Para cada fase incluye: objetivo, rutas a crear, queries GraphQL nuevas, riesgos, y «definition of done». Al final incluye una tabla «PDF sección → ruta/feature → estado».
Copia textual del PDF no hace falta; cúmplelo conceptualmente.
```

---

*Última actualización: generado para alinear el desarrollo con el PDF de estructura; revisa textos legales y políticas con asesoría jurídica antes de publicar.*

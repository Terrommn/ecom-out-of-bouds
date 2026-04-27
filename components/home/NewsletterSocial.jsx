import { GsapReveal } from "./GsapReveal";

export function NewsletterSocial() {
  return (
    <GsapReveal as="section" className="py-20 md:py-24">
      <div className="oob-container">
        <div className="rounded-2xl border border-[color:var(--oob-border)] bg-gradient-to-br from-[var(--oob-surface)]/60 to-[var(--oob-bg-elevated)] px-6 py-12 md:px-14 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--oob-gold)] mb-3">
                Newsletter
              </p>
              <h2 className="oob-heading-xl text-2xl md:text-3xl text-[var(--oob-cream)]">
                Sé el primero en conocer lanzamientos
              </h2>
              <p className="mt-4 text-sm text-[var(--oob-muted)]">
                Suscríbete y recibe{" "}
                <span className="text-[var(--oob-gold)] font-medium">10% de descuento</span> en tu primera compra.
              </p>
              {process.env.NEXT_PUBLIC_NEWSLETTER_FORM_ACTION ? (
                <form
                  className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md"
                  action={process.env.NEXT_PUBLIC_NEWSLETTER_FORM_ACTION}
                  method="post"
                >
                  <label htmlFor="newsletter-email" className="sr-only">
                    Correo electrónico
                  </label>
                  <input
                    id="newsletter-email"
                    name="email"
                    type="email"
                    required
                    placeholder="tu@email.com"
                    className="flex-1 rounded-full border border-[color:var(--oob-border)] bg-[var(--oob-bg)]/80 px-5 py-3 text-sm text-[var(--oob-cream)] placeholder:text-[var(--oob-muted)] focus:border-[var(--oob-gold)] focus:outline-none focus:ring-1 focus:ring-[var(--oob-gold)]/40"
                  />
                  <button
                    type="submit"
                    className="rounded-full bg-[var(--oob-gold)] px-6 py-3 text-sm font-semibold uppercase tracking-wider text-[var(--oob-bg)] hover:bg-[var(--oob-gold-hover)] transition-colors"
                  >
                    Unirme
                  </button>
                </form>
              ) : (
                <p className="mt-8 text-xs text-[var(--oob-muted)] max-w-md">
                  Configura <code className="text-[var(--oob-gold)]">NEXT_PUBLIC_NEWSLETTER_FORM_ACTION</code>{" "}
                  (URL de Klaviyo, Shopify Email, etc.) para activar el envío real del formulario.
                </p>
              )}
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--oob-gold)] mb-3">
                Síguenos
              </p>
              <p className="text-[var(--oob-muted)] text-sm">
                Contenido detrás de cámaras, equipaciones en torneos y colaboraciones. Próximamente feed de Instagram integrado.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                {[
                  {
                    href: "https://www.instagram.com/outofbounds.mx",
                    label: "Instagram",
                  },
                ].map((s) => (
                  <a
                    key={s.href}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center rounded-full border border-[color:var(--oob-border)] px-5 py-2.5 text-sm text-[var(--oob-cream)] hover:border-[var(--oob-gold)] hover:text-[var(--oob-gold)] transition-colors"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </GsapReveal>
  );
}

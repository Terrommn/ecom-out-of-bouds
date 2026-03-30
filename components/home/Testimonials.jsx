"use client";

import { useRef, useLayoutEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const REVIEWS = [
  {
    name: "Laura M.",
    role: "Hándicap 12",
    text: "Los polos tienen un caída impecable y el tejido aguanta las vueltas completas sin perder forma.",
    stars: 5,
    avatarSrc:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=128&h=128&fit=crop&crop=face&q=80",
  },
  {
    name: "Carlos V.",
    role: "Socio club",
    text: "Por fin una marca que entiende estética y técnica. Uso la chaqueta también fuera del campo.",
    stars: 5,
    avatarSrc:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=128&h=128&fit=crop&crop=face&q=80",
  },
  {
    name: "Elena R.",
    role: "Torneos nacionales",
    text: "Envío rápido y tallaje fiel. El cinturón y los guantes son de los mejores que he probado.",
    stars: 5,
    avatarSrc:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=128&h=128&fit=crop&crop=face&q=80",
  },
];

export function Testimonials() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      gsap.set(el.querySelectorAll("[data-review-card]"), { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll("[data-review-card]"),
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        },
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-28 border-b border-[color:var(--oob-border)]"
    >
      <div className="oob-container">
        <div className="mb-12 md:mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--oob-gold)] mb-3">
              Testimonios
            </p>
            <h2 className="oob-heading-xl text-3xl md:text-4xl text-[var(--oob-cream)]">
              En el campo y después del hoyo
            </h2>
          </div>
          <p className="text-sm text-[var(--oob-muted)] max-w-md md:text-right">
            Opiniones de jugadores que visten OOB en competición y en el día a día.
          </p>
        </div>

        <div className="flex gap-5 overflow-x-auto pb-2 snap-x snap-mandatory md:grid md:grid-cols-3 md:overflow-visible scrollbar-thin">
          {REVIEWS.map((r) => (
            <article
              key={r.name}
              data-review-card
              className="min-w-[min(100%,320px)] md:min-w-0 snap-start rounded-lg border border-[color:var(--oob-border)] bg-[var(--oob-surface)]/35 p-6 md:p-8 flex flex-col"
            >
              <div className="flex gap-0.5 text-[var(--oob-gold)]" aria-label={`${r.stars} de 5 estrellas`}>
                {Array.from({ length: r.stars }).map((_, i) => (
                  <span key={i} aria-hidden>
                    ★
                  </span>
                ))}
              </div>
              <p className="mt-4 text-[var(--oob-cream)]/95 leading-relaxed flex-1">&ldquo;{r.text}&rdquo;</p>
              <div className="mt-6 flex items-center gap-3">
                <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full border border-[color:var(--oob-border)] bg-[var(--oob-bg)]">
                  <Image
                    src={r.avatarSrc}
                    alt=""
                    width={44}
                    height={44}
                    className="h-full w-full object-cover"
                    sizes="44px"
                  />
                </div>
                <div>
                  <p className="font-medium text-[var(--oob-cream)]">{r.name}</p>
                  <p className="text-xs text-[var(--oob-muted)]">{r.role}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

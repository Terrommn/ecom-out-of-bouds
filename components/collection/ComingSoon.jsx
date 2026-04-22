"use client";

import { useState } from "react";
import Link from "next/link";

export function ComingSoon({
  title = "Mujer",
  eyebrow = "Próximamente",
  description = "Estamos preparando la nueva colección. Déjanos tu número y te avisamos apenas esté disponible.",
}) {
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    setError("");

    const cleaned = phone.replace(/[^\d+]/g, "");
    if (cleaned.replace(/\D/g, "").length < 8) {
      setError("Ingresa un número de celular válido.");
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch("/api/coming-soon/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: cleaned, collection: title }),
      });
      if (!res.ok) throw new Error("request failed");
      setStatus("success");
      setPhone("");
    } catch {
      setStatus("idle");
      setError("No pudimos registrar tu número. Intenta de nuevo.");
    }
  }

  return (
    <div className="relative min-h-[70vh]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden blur-2xl opacity-60"
      >
        <div className="oob-container py-10 md:py-12 space-y-8">
          <div className="h-10 w-64 rounded bg-[var(--oob-surface)]" />
          <div className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="aspect-[3/4] rounded-lg bg-gradient-to-br from-[var(--oob-surface)] to-[var(--oob-bg-elevated)] border border-[color:var(--oob-border)]"
              />
            ))}
          </div>
        </div>
      </div>

      <div className="absolute inset-0 bg-[var(--oob-bg)]/70" aria-hidden />

      <div className="relative oob-container py-16 md:py-24 flex items-center justify-center">
        <div className="w-full max-w-lg rounded-2xl border border-[color:var(--oob-border)] bg-[var(--oob-bg-elevated)]/95 backdrop-blur-sm p-8 md:p-10 shadow-xl shadow-black/30 text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-[var(--oob-gold)] mb-3">
            {eyebrow}
          </p>
          <h1 className="oob-heading-xl text-3xl md:text-4xl text-[var(--oob-cream)]">
            {title}
          </h1>
          <p className="mt-4 text-sm md:text-base text-[var(--oob-muted)]">
            {description}
          </p>

          {status === "success" ? (
            <div className="mt-8 rounded-lg border border-[var(--oob-gold)]/50 bg-[var(--oob-gold)]/10 px-4 py-5 text-sm text-[var(--oob-cream)]">
              ¡Listo! Te avisaremos apenas la colección esté disponible.
            </div>
          ) : (
            <form onSubmit={onSubmit} className="mt-8 space-y-3 text-left">
              <label
                htmlFor="coming-soon-phone"
                className="block text-xs uppercase tracking-wider text-[var(--oob-muted)]"
              >
                Número de celular
              </label>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  id="coming-soon-phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="+52 55 1234 5678"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  disabled={status === "loading"}
                  className="flex-1 rounded-full border border-[color:var(--oob-border)] bg-[var(--oob-bg)] px-5 py-3 text-sm text-[var(--oob-cream)] placeholder:text-[var(--oob-muted)] focus:border-[var(--oob-gold)] focus:outline-none"
                  required
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="rounded-full bg-[var(--oob-gold)] px-6 py-3 text-sm font-semibold uppercase tracking-wider text-[var(--oob-bg)] transition-opacity hover:opacity-90 disabled:opacity-60"
                >
                  {status === "loading" ? "Enviando…" : "Avísame"}
                </button>
              </div>
              {error ? (
                <p className="text-xs text-red-400">{error}</p>
              ) : (
                <p className="text-xs text-[var(--oob-muted)]">
                  Solo te escribiremos para avisarte del lanzamiento.
                </p>
              )}
            </form>
          )}

          <div className="mt-8 flex items-center justify-center gap-4 text-xs text-[var(--oob-muted)]">
            <Link href="/collections" className="hover:text-[var(--oob-gold)]">
              Ver otras colecciones
            </Link>
            <span aria-hidden>·</span>
            <Link href="/" className="hover:text-[var(--oob-gold)]">
              Volver al inicio
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

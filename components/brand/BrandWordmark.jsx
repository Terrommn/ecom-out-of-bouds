import Image from "next/image";

/**
 * Wordmark desde `public/brand/wordmark-full.svg`.
 * - `onDark` (por defecto): blanco en barra superior (filtro CSS), hover muestra el color original del SVG.
 * - `onLight`: colores originales del archivo (dorado / marca) para fondos claros.
 */
export function BrandWordmark({
  className = "",
  title = "Out Of Bounds Golf Garments",
  variant = "onDark",
}) {
  const onDark = variant === "onDark";

  return (
    <span
      className={`inline-flex shrink-0 items-center ${className}`}
      role="img"
      aria-label={title}
    >
      <Image
        src="/brand/wordmark-full.svg"
        alt=""
        width={4557}
        height={802}
        sizes="(max-width: 640px) 200px, (max-width: 1024px) 240px, 280px"
        className={
          onDark
            ? "h-8 w-auto max-w-[min(260px,62vw)] md:h-10 lg:h-11 brightness-0 invert contrast-100 transition-[filter,opacity] duration-200 group-hover:brightness-100 group-hover:invert-0 group-hover:contrast-100"
            : "h-8 w-auto max-w-[min(260px,62vw)] md:h-10 lg:h-11"
        }
        priority={onDark}
      />
    </span>
  );
}

import { LegalPage } from "@/components/legal/LegalPage";

export const metadata = {
  title: "Acerca de nosotros | Out Of Bounds",
  description: "Historia, valores y filosofía de Out Of Bounds.",
};

export default function AboutPage() {
  return (
    <LegalPage title="Acerca de Out Of Bounds" updated="[REVISAR FECHA]">
      <p>
        Out Of Bounds es una marca de ropa y accesorios de golf pensada para jugadores que buscan
        rendimiento técnico y una estética sobria, dentro y fuera del campo.
      </p>
      <h2>Historia</h2>
      <p>
        [REVISAR] Texto sobre fundadores y origen de la marca. Este contenido es un placeholder
        comercial; debe sustituirse por la narrativa oficial del equipo.
      </p>
      <h2>Misión, visión y valores</h2>
      <p>
        Misión: ofrecer prendas con materiales de calidad y diseño atemporal. Visión: ser referencia
        de golf lifestyle en tu mercado. Valores: calidad, estilo y rendimiento (PDF estructura).
      </p>
      <h2>Diseño y fabricación</h2>
      <p>
        [REVISAR] Describe el proceso de diseño, selección de tejidos y fabricación. Añade
        fotografías del equipo o proceso en una galería cuando tengas assets.
      </p>
      <h2>Video corporativo</h2>
      <p>
        [Opcional] Inserta aquí un iframe o componente de vídeo cuando la URL esté disponible.
      </p>
    </LegalPage>
  );
}

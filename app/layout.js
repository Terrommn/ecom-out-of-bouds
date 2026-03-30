import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";

const display = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const body = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "Out Of Bounds | Golf de lujo",
  description:
    "Ropa y accesorios de golf de alta gama. Diseño, rendimiento y elegancia en cada swing.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es-MX">
      <body
        className={`${display.variable} ${body.variable} antialiased min-h-screen flex flex-col`}
      >
        <div className="oob-grain" aria-hidden />
        <AnnouncementBar />
        <SiteHeader />
        <main className="flex-1 relative z-[1]">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}

import type { Metadata, Viewport } from "next";
import "@fontsource-variable/inter";
import "@fontsource-variable/space-grotesk";
import "./globals.css";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  metadataBase: new URL("https://suyu-tool.pages.dev"),
  title: {
    default: "Suyu Tool — Semua tool dalam satu tempat",
    template: "%s · Suyu Tool",
  },
  description:
    "Kumpulan tools online modern: QR Code Studio dengan warna, gradasi, dan bentuk custom, plus tool harian lain yang segera hadir. Gratis dan diproses di browser.",
  keywords: ["tools online", "qr code generator", "qr code berwarna", "suyu tool"],
  openGraph: {
    title: "Suyu Tool — Semua tool dalam satu tempat",
    description:
      "QR Code Studio dengan warna, gradasi, dan bentuk custom. Gratis, cepat, dan privat.",
    type: "website",
    locale: "id_ID",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#060b18",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className="dark">
      <body className="relative min-h-screen bg-night-900 font-sans text-ink-50">
        <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_-10%,#0b1a3d_0%,#060b18_55%,#04070f_100%)]" />
          <div className="absolute -left-40 top-1/3 h-[420px] w-[420px] rounded-full bg-ink-600/20 blur-[130px]" />
          <div className="absolute -right-32 top-10 h-[380px] w-[380px] rounded-full bg-cyan-500/10 blur-[130px]" />
          <div className="absolute inset-0 opacity-[0.35] [background-image:radial-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:26px_26px]" />
        </div>

        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}

import Link from "next/link";
import { ArrowRight, Gauge, Lock, Sparkles } from "lucide-react";

import { Hero } from "@/components/hero";
import { ToolsExplorer } from "@/components/tools-explorer";
import { Button } from "@/components/ui/button";

const FEATURES = [
  {
    icon: Gauge,
    title: "Cepat, tanpa loading",
    body: "Halaman di-render statis dan di-cache di edge. Tool langsung terbuka, bahkan di jaringan lambat.",
  },
  {
    icon: Lock,
    title: "Privat dari awal",
    body: "QR dibuat di canvas browser kamu. Tidak ada file atau teks yang dikirim ke server mana pun.",
  },
  {
    icon: Sparkles,
    title: "Gratis tanpa akun",
    body: "Tanpa daftar, tanpa batas harian, tanpa watermark. Tinggal pakai dan unduh hasilnya.",
  },
];

export default function HomePage() {
  return (
    <>
      <Hero />

      <ToolsExplorer />

      <section id="tentang" className="mx-auto mt-24 w-full max-w-6xl scroll-mt-24 px-5">
        <div className="flex flex-col gap-3 text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-300/80">
            Kenapa Suyu Tool
          </p>
          <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Dibangun untuk dipakai, bukan dipamerkan
          </h2>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {FEATURES.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="rounded-3xl border border-white/[0.07] bg-white/[0.03] p-6 backdrop-blur-xl transition hover:border-white/[0.14]"
            >
              <span className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-gradient-to-br from-ink-500/25 to-cyan-400/15">
                <Icon className="h-5 w-5 text-cyan-300" strokeWidth={1.9} />
              </span>
              <h3 className="mt-4 font-display text-base font-semibold text-white">{title}</h3>
              <p className="mt-2 text-[13.5px] leading-relaxed text-ink-200/70">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-20 w-full max-w-6xl px-5">
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-ink-600/25 via-night-800/60 to-cyan-500/10 p-8 sm:p-12">
          <div
            aria-hidden
            className="absolute -right-16 -top-20 h-64 w-64 rounded-full bg-cyan-400/20 blur-[100px]"
          />
          <div className="relative flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <div className="max-w-lg">
              <h2 className="font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Coba QR Studio sekarang
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-200/70">
                Buat QR berwarna dengan bentuk custom dalam hitungan detik — lalu unduh PNG-nya
                dalam resolusi tinggi.
              </p>
            </div>
            <Button asChild size="lg" className="shrink-0 rounded-2xl">
              <Link href="/qr/">
                Buka QR Studio <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}

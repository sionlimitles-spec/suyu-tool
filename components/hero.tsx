"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Layers, ShieldCheck, Zap } from "lucide-react";

import { QrShowcase } from "@/components/qr-showcase";
import { Button } from "@/components/ui/button";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const STATS = [
  { icon: Zap, label: "Tool aktif", value: "1" },
  { icon: Layers, label: "Segera", value: "11" },
  { icon: ShieldCheck, label: "Gratis", value: "100%" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden pb-16 pt-14 sm:pt-20 lg:pb-24">
      {/* background layers */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_20%_0%,rgba(37,99,235,0.28),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(50%_45%_at_85%_10%,rgba(34,211,238,0.16),transparent_70%)]" />
        <div className="absolute inset-x-0 top-0 h-[520px] bg-grid-fade bg-[size:56px_56px] [mask-image:radial-gradient(70%_60%_at_50%_0%,black,transparent)]" />
        <div className="absolute -left-24 top-32 h-64 w-64 rounded-full bg-ink-600/30 blur-[100px]" />
        <div className="absolute -right-16 top-10 h-72 w-72 rounded-full bg-cyan-500/20 blur-[110px]" />
      </div>

      <div className="mx-auto grid w-full max-w-6xl items-center gap-14 px-5 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.div variants={item}>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 text-xs font-medium text-ink-200/80 backdrop-blur">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-cyan-400" />
              </span>
              v1.0 — QR Studio sudah aktif
            </span>
          </motion.div>

          <motion.h1
            variants={item}
            className="mt-6 text-balance font-display text-[2.6rem] font-bold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-[4.1rem]"
          >
            Semua tool,
            <br className="hidden sm:block" /> dalam{" "}
            <span className="bg-gradient-to-r from-ink-400 via-cyan-300 to-ink-400 bg-clip-text text-transparent">
              satu tempat
            </span>
            .
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-5 max-w-xl text-[15px] leading-relaxed text-ink-200/70 sm:text-base"
          >
            Suyu Tool mengumpulkan tools harian yang biasanya kamu cari-cari di Google. Mulai dari{" "}
            <span className="font-medium text-white">QR Code Studio</span> — bikin QR berwarna dan
            bergradasi dengan bentuk yang bisa kamu atur sendiri. Semua diproses di browser, tanpa
            upload.
          </motion.p>

          <motion.div variants={item} className="mt-8 flex flex-wrap items-center gap-3">
            <Button asChild size="lg" className="flex-1 rounded-2xl sm:flex-none">
              <Link href="/qr/">
                Coba QR Studio <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="secondary" size="lg" className="flex-1 rounded-2xl sm:flex-none">
              <Link href="#tools">Lihat semua tools</Link>
            </Button>
          </motion.div>

          <motion.dl variants={item} className="mt-10 grid max-w-lg grid-cols-3 gap-2.5 sm:gap-3">
            {STATS.map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="rounded-2xl border border-white/[0.08] bg-white/[0.035] px-3 py-3 backdrop-blur"
              >
                <Icon className="h-4 w-4 text-cyan-300" />
                <dt className="mt-2 whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.1em] text-ink-200/60">
                  {label}
                </dt>
                <dd className="font-display text-lg font-bold leading-tight text-white sm:text-xl">
                  {value}
                </dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>

        <QrShowcase />
      </div>
    </section>
  );
}

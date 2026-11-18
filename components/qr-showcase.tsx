"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

import { renderQr, type QrDesign } from "@/lib/qr/render";

const SHOWCASE_DESIGN: QrDesign = {
  text: "https://suyu.tool",
  ecc: "M",
  size: 420,
  margin: 2,
  dot: "rounded",
  eye: "rounded",
  fg: "#1d4ed8",
  fg2: "#22d3ee",
  bg: "#ffffff",
  transparent: false,
  gradient: true,
};

export function QrShowcase() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) renderQr(canvasRef.current, SHOWCASE_DESIGN);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, rotate: -1.5 }}
      animate={{ opacity: 1, y: 0, rotate: -1.5 }}
      transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="relative mx-auto w-full max-w-[360px]"
    >
      <div className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br from-ink-500/30 via-cyan-400/20 to-transparent blur-2xl" />

      <div className="relative rounded-[2rem] border border-white/12 bg-white/[0.06] p-3 shadow-[0_40px_100px_-40px_rgba(30,90,255,0.7)] backdrop-blur-2xl">
        <div className="overflow-hidden rounded-[1.4rem] bg-white p-4">
          <canvas
            ref={canvasRef}
            className="h-auto w-full rounded-lg"
            aria-label="Contoh QR code Suyu Tool"
          />
        </div>

        <div className="flex items-center justify-between px-2 pb-1 pt-4">
          <div className="flex flex-col">
            <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-200/55">
              QR Studio
            </span>
            <span className="text-sm font-medium text-white">Gradasi · Bentuk custom</span>
          </div>
          <span className="mr-1 inline-flex items-center gap-1.5 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-2.5 py-1 text-[11px] font-semibold text-emerald-300">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Live
          </span>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-center gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 text-[11px] font-medium text-ink-200/80 backdrop-blur">
          <Sparkles className="h-3 w-3 text-cyan-300" /> PNG 1024px
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 text-[11px] font-medium text-ink-200/80 backdrop-blur">
          <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-ink-400 to-cyan-400" />
          100% offline
        </span>
      </div>
    </motion.div>
  );
}

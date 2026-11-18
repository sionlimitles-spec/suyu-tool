"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Copy, Download, RotateCcw, ShieldCheck } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ColorField, Label, NativeSelect, Textarea } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { ScanTips } from "@/components/qr/scan-tips";
import { QR_PRESETS, renderQr, type QrDesign } from "@/lib/qr/render";

const DEFAULT_DESIGN: QrDesign = {
  text: "https://suyu.tool",
  ecc: "M",
  size: 640,
  margin: 2,
  dot: "rounded",
  eye: "rounded",
  fg: "#1d4ed8",
  fg2: "#22d3ee",
  bg: "#ffffff",
  transparent: false,
  gradient: true,
};

type Toast = { id: number; message: string; tone: "ok" | "error" };

export function QrStudio() {
  const [design, setDesign] = useState<QrDesign>(DEFAULT_DESIGN);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<Toast | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const update = useCallback((patch: Partial<QrDesign>) => {
    setDesign((prev) => ({ ...prev, ...patch }));
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;
    const result = renderQr(canvasRef.current, design);
    setError(result.ok ? null : result.error);
  }, [design]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2600);
    return () => clearTimeout(t);
  }, [toast]);

  const notify = (message: string, tone: Toast["tone"] = "ok") =>
    setToast({ id: Date.now(), message, tone });

  const download = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.toBlob((blob) => {
      if (!blob) return notify("Gagal membuat gambar.", "error");
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "suyu-tool-qr.png";
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 800);
      notify("QR berhasil diunduh");
    }, "image/png");
  };

  const copy = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/png"));
    if (!blob) return notify("Gagal menyalin.", "error");

    if (!navigator.clipboard || typeof ClipboardItem === "undefined") {
      return notify("Browser ini belum mendukung salin gambar.", "error");
    }

    try {
      await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
      notify("Gambar disalin ke clipboard");
    } catch {
      notify("Salin ditolak browser — pakai Unduh PNG.", "error");
    }
  };

  return (
    <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.92fr)]">
      {/* ---------------- Controls ---------------- */}
      <Card className="p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="font-display text-lg font-semibold tracking-tight text-white">
              Isi &amp; gaya
            </h2>
            <p className="mt-1 text-[13px] text-ink-200/55">
              Setiap perubahan langsung tampil di pratinjau.
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="shrink-0"
            onClick={() => setDesign(DEFAULT_DESIGN)}
          >
            <RotateCcw className="h-3.5 w-3.5" /> Reset
          </Button>
        </div>

        <div className="mt-6 space-y-5">
          {/* content */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <Label htmlFor="qr-text">Isi / Link</Label>
              <span className="font-mono text-[11px] text-ink-200/40">
                {design.text.length} karakter
              </span>
            </div>
            <Textarea
              id="qr-text"
              rows={3}
              value={design.text}
              onChange={(e) => update({ text: e.target.value })}
              placeholder="https://contoh.com atau teks apa pun…"
            />
          </div>

          <div className="h-px bg-white/[0.07]" />

          {/* size + margin */}
          <div className="space-y-5">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Ukuran</Label>
                <span className="rounded-md border border-white/10 bg-white/[0.05] px-2 py-0.5 font-mono text-[11px] text-ink-100">
                  {design.size}px
                </span>
              </div>
              <Slider
                value={[design.size]}
                min={200}
                max={1024}
                step={8}
                onValueChange={([v]) => update({ size: v })}
                aria-label="Ukuran QR"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Margin</Label>
                <span className="rounded-md border border-white/10 bg-white/[0.05] px-2 py-0.5 font-mono text-[11px] text-ink-100">
                  {design.margin} modul
                </span>
              </div>
              <Slider
                value={[design.margin]}
                min={0}
                max={8}
                step={1}
                onValueChange={([v]) => update({ margin: v })}
                aria-label="Margin QR"
              />
            </div>
          </div>

          <div className="h-px bg-white/[0.07]" />

          {/* shape selects */}
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="qr-ecc">Koreksi error</Label>
              <NativeSelect
                id="qr-ecc"
                value={design.ecc}
                onChange={(e) => update({ ecc: e.target.value as QrDesign["ecc"] })}
              >
                <option value="L">L — 7%</option>
                <option value="M">M — 15%</option>
                <option value="Q">Q — 25%</option>
                <option value="H">H — 30%</option>
              </NativeSelect>
            </div>
            <div className="space-y-2">
              <Label htmlFor="qr-dot">Bentuk titik</Label>
              <NativeSelect
                id="qr-dot"
                value={design.dot}
                onChange={(e) => update({ dot: e.target.value as QrDesign["dot"] })}
              >
                <option value="square">Kotak</option>
                <option value="rounded">Kotak bulat</option>
                <option value="circle">Bulat</option>
              </NativeSelect>
            </div>
            <div className="space-y-2">
              <Label htmlFor="qr-eye">Bentuk mata QR</Label>
              <NativeSelect
                id="qr-eye"
                value={design.eye}
                onChange={(e) => update({ eye: e.target.value as QrDesign["eye"] })}
              >
                <option value="square">Kotak</option>
                <option value="rounded">Kotak bulat</option>
                <option value="circle">Bulat</option>
              </NativeSelect>
            </div>
          </div>

          <div className="h-px bg-white/[0.07]" />

          {/* colors */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label>Warna depan 1</Label>
                <ColorField
                  value={design.fg}
                  onChange={(e) => update({ fg: e.target.value })}
                  aria-label="Warna utama"
                />
              </div>
              <div className="space-y-2">
                <Label>Warna depan 2</Label>
                <ColorField
                  value={design.fg2}
                  onChange={(e) => update({ fg2: e.target.value })}
                  aria-label="Warna kedua"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="qr-bg">Warna latar</Label>
              <ColorField
                id="qr-bg"
                value={design.bg}
                onChange={(e) => update({ bg: e.target.value })}
                aria-label="Warna latar"
                className={design.transparent ? "pointer-events-none opacity-50" : undefined}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5">
                <span className="text-[12.5px] text-ink-100">Gradasi</span>
                <Switch
                  checked={design.gradient}
                  onCheckedChange={(v) => update({ gradient: v })}
                  aria-label="Gradasi"
                />
              </div>
              <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5">
                <span className="text-[12.5px] text-ink-100">Transparan</span>
                <Switch
                  checked={design.transparent}
                  onCheckedChange={(v) => update({ transparent: v })}
                  aria-label="Latar transparan"
                />
              </div>
            </div>
          </div>

          <div className="h-px bg-white/[0.07]" />

          {/* presets */}
          <div className="space-y-2.5">
            <Label>Preset cepat</Label>
            <div className="flex flex-wrap gap-2">
              {QR_PRESETS.map((preset) => {
                const active = design.fg === preset.fg && design.fg2 === preset.fg2;
                return (
                  <button
                    key={preset.name}
                    type="button"
                    onClick={() =>
                      update({
                        fg: preset.fg,
                        fg2: preset.fg2,
                        dot: preset.dot,
                        eye: preset.eye,
                      })
                    }
                    className={
                      "flex items-center gap-2 rounded-xl border px-2.5 py-2 text-[12.5px] transition " +
                      (active
                        ? "border-ink-400/60 bg-ink-500/15 text-white"
                        : "border-white/10 bg-white/[0.04] text-ink-200/75 hover:border-white/25 hover:text-white")
                    }
                  >
                    <span
                      className="h-4 w-4 rounded-full ring-1 ring-white/20"
                      style={{
                        backgroundImage: `linear-gradient(135deg, ${preset.fg}, ${preset.fg2})`,
                      }}
                    />
                    {preset.name}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </Card>

      {/* ---------------- Preview ---------------- */}
      <div className="flex flex-col gap-5">
        <Card className="flex flex-col p-5 sm:p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-200/60">
              Pratinjau
            </span>
          </div>
          <Badge variant="brand">
            {design.size} × {design.size}
          </Badge>
        </div>

        <div className="checkerboard mt-4 grid min-h-[300px] flex-1 place-items-center overflow-hidden rounded-2xl border border-white/10 p-5">
          <div className="rounded-xl bg-white/[0.02] p-1 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.9)]">
            <canvas
              ref={canvasRef}
              className="h-auto max-h-[50vh] w-auto max-w-full rounded-lg"
              aria-label="Pratinjau QR code"
            />
          </div>
        </div>

        {error ? (
          <p className="mt-3 rounded-xl border border-red-400/25 bg-red-500/10 px-3 py-2 text-[12.5px] text-red-200">
            {error}
          </p>
        ) : (
          <p className="mt-3 flex items-center gap-1.5 text-[12px] text-ink-200/45">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-400/80" />
            Diproses di perangkatmu — tidak ada data yang dikirim ke server.
          </p>
        )}

        <div className="mt-4 grid grid-cols-2 gap-2.5">
          <Button onClick={download} className="rounded-xl">
            <Download className="h-4 w-4" /> Unduh PNG
          </Button>
          <Button variant="secondary" onClick={copy} className="rounded-xl">
            <Copy className="h-4 w-4" /> Salin
          </Button>
        </div>
        </Card>

        <ScanTips />
      </div>

      <AnimatePresence>
        {toast && (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.97 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-0 bottom-6 z-[60] mx-auto flex w-fit items-center gap-2 rounded-full border border-white/12 bg-night-800/95 px-4 py-2.5 text-sm text-white shadow-2xl backdrop-blur-xl"
          >
            <span
              className={
                "grid h-5 w-5 place-items-center rounded-full " +
                (toast.tone === "ok" ? "bg-emerald-400/20 text-emerald-300" : "bg-red-400/20 text-red-300")
              }
            >
              <Check className="h-3 w-3" />
            </span>
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

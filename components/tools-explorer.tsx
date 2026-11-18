"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Lock, Search } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { CATEGORIES, TOOLS, type Tool, type ToolCategory } from "@/lib/tools";
import { cn } from "@/lib/utils";

function ToolCard({ tool }: { tool: Tool }) {
  const [spot, setSpot] = useState({ x: 0, y: 0 });
  const Icon = tool.icon;
  const isReady = tool.status === "ready";

  const inner = (
    <>
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(320px circle at ${spot.x}px ${spot.y}px, rgba(59,130,246,0.16), transparent 62%)`,
        }}
      />

      <div className="relative flex items-start justify-between gap-2">
        <span
          className="grid h-9 w-9 shrink-0 place-items-center rounded-lg shadow-[0_10px_24px_-12px_rgba(0,0,0,0.9)] sm:h-11 sm:w-11 sm:rounded-xl"
          style={{ backgroundImage: `linear-gradient(135deg, ${tool.tint[0]}, ${tool.tint[1]})` }}
        >
          <Icon className="h-4 w-4 text-white sm:h-[22px] sm:w-[22px]" strokeWidth={1.9} />
        </span>
        <Badge
          variant={isReady ? "ready" : "soon"}
          className="shrink-0 px-2 py-0.5 text-[10px] tracking-[0.06em] sm:px-2.5 sm:py-1 sm:text-[11px]"
        >
          {isReady ? "Tersedia" : "Segera"}
        </Badge>
      </div>

      <h3
        className={cn(
          "relative mt-3 font-display text-[13.5px] font-semibold leading-tight tracking-tight sm:mt-4 sm:text-[17px]",
          isReady ? "text-white" : "text-ink-100/70",
        )}
      >
        {tool.name}
      </h3>
      <p className="relative mt-1 line-clamp-2 text-[11.5px] leading-snug text-ink-200/65 sm:mt-1.5 sm:text-[13.5px] sm:leading-relaxed sm:text-ink-200/70">
        {tool.tagline}
      </p>

      <div className="relative mt-auto flex items-center justify-between pt-3 sm:pt-5">
        <span className="text-[9px] font-semibold uppercase tracking-[0.12em] text-ink-200/45 sm:text-[10px] sm:tracking-[0.16em]">
          {tool.category} · {tool.tag}
        </span>
        {isReady ? (
          <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-cyan-300 sm:text-xs">
            <span>Buka</span>
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </span>
        ) : (
          <Lock className="h-3.5 w-3.5 text-ink-200/30" />
        )}
      </div>
    </>
  );

  const shell = cn(
    "group relative flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border p-4 backdrop-blur-xl transition-all duration-300 sm:rounded-3xl sm:p-5",
    isReady
      ? "border-ink-400/25 bg-gradient-to-b from-ink-500/[0.12] to-white/[0.03] hover:-translate-y-1 hover:border-ink-400/50 hover:shadow-glow"
      : "border-white/[0.07] bg-white/[0.03] saturate-[0.8] hover:-translate-y-0.5 hover:border-white/[0.16] hover:saturate-100",
  );

  if (isReady && tool.href) {
    return (
      <Link
        href={tool.href}
        className={shell}
        onMouseMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          setSpot({ x: e.clientX - r.left, y: e.clientY - r.top });
        }}
      >
        {inner}
      </Link>
    );
  }

  return (
    <div className={shell} aria-disabled="true">
      {inner}
    </div>
  );
}

export function ToolsExplorer() {
  const [category, setCategory] = useState<ToolCategory | "Semua">("Semua");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return TOOLS.filter((t) => {
      const byCat = category === "Semua" || t.category === category;
      const byQuery =
        !q ||
        t.name.toLowerCase().includes(q) ||
        t.tagline.toLowerCase().includes(q) ||
        t.tag.toLowerCase().includes(q);
      return byCat && byQuery;
    });
  }, [category, query]);

  return (
    <section id="tools" className="relative mx-auto w-full max-w-6xl scroll-mt-24 px-5">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-300/80">
            Katalog
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Semua Tools
          </h2>
          <p className="mt-2 max-w-md text-sm text-ink-200/70">
            {TOOLS.length} tools dalam rencana · {TOOLS.filter((t) => t.status === "ready").length}{" "}
            sudah bisa dipakai sekarang.
          </p>
        </div>

        <div className="relative w-full sm:max-w-xs">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-200/50" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari tool…"
            className="h-11 rounded-xl pl-10"
            aria-label="Cari tool"
          />
        </div>
      </div>

      <div className="-mx-5 mt-6 flex snap-x gap-2 overflow-x-auto px-5 pb-1 [mask-image:linear-gradient(to_right,black_92%,transparent)] [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0 sm:[mask-image:none] [&::-webkit-scrollbar]:hidden">
        {CATEGORIES.map((cat) => {
          const active = cat === category;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              className={cn(
                "relative shrink-0 snap-start rounded-full px-4 py-2 text-[13px] font-medium transition-colors",
                active ? "text-white" : "text-ink-200/70 hover:text-white",
              )}
            >
              {active && (
                <motion.span
                  layoutId="cat-pill"
                  className="absolute inset-0 rounded-full border border-ink-400/40 bg-ink-500/20"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <span className="relative">{cat}</span>
            </button>
          );
        })}
      </div>

      <motion.div layout className="mt-6 grid grid-cols-2 gap-3 sm:mt-8 sm:gap-4 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((tool) => (
            <motion.div
              key={tool.slug}
              layout
              initial={{ opacity: 0, y: 14, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="min-w-0"
            >
              <ToolCard tool={tool} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <div className="mt-10 rounded-3xl border border-dashed border-white/10 py-14 text-center">
          <p className="text-sm text-ink-200/70">
            Tidak ada tool yang cocok dengan “{query}”. Coba kata kunci lain.
          </p>
        </div>
      )}
    </section>
  );
}

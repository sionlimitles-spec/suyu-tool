"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Github, Info, Layers, Menu, QrCode, X } from "lucide-react";

const LINKS = [
  { href: "/#tools", label: "Semua Tools", icon: Layers },
  { href: "/qr/", label: "QR Studio", icon: QrCode },
  { href: "/#tentang", label: "Tentang", icon: Info },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const overlay = (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[60] bg-night-900/75 backdrop-blur-sm md:hidden"
          />
          <motion.nav
            initial={{ opacity: 0, y: -10, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.97 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="fixed right-3 top-[76px] z-[61] w-60 overflow-hidden rounded-2xl border border-white/[0.12] bg-night-800/95 p-1.5 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9)] backdrop-blur-2xl md:hidden"
          >
            {LINKS.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="flex h-11 items-center gap-3 rounded-xl px-3 text-sm font-medium text-ink-100 transition hover:bg-white/[0.07] hover:text-white"
              >
                <Icon className="h-4 w-4 text-ink-200/70" />
                {label}
              </Link>
            ))}
            <div className="my-1 h-px bg-white/[0.08]" />
            <Link
              href="https://github.com/sionlimitles-spec/suyu-tool"
              target="_blank"
              rel="noreferrer"
              onClick={() => setOpen(false)}
              className="flex h-11 items-center gap-3 rounded-xl px-3 text-sm font-medium text-ink-100 transition hover:bg-white/[0.07] hover:text-white"
            >
              <Github className="h-4 w-4 text-ink-200/70" />
              GitHub
            </Link>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  );

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-label={open ? "Tutup menu" : "Buka menu"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className={
          "grid h-10 w-10 place-items-center rounded-xl border transition " +
          (open
            ? "border-ink-400/50 bg-ink-500/20 text-white"
            : "border-white/10 text-ink-200/80 hover:border-white/20 hover:text-white")
        }
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {mounted ? createPortal(overlay, document.body) : null}
    </div>
  );
}

import Link from "next/link";
import { Github, QrCode } from "lucide-react";

import { MobileNav } from "@/components/mobile-nav";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="mx-auto mt-3 w-full max-w-6xl px-3 sm:px-5">
        <div className="flex h-16 items-center justify-between gap-3 rounded-2xl border border-white/[0.08] bg-night-900/70 px-3 shadow-[0_18px_50px_-30px_rgba(0,0,0,0.9)] backdrop-blur-xl sm:px-4">
          <Link href="/" className="group flex items-center gap-3">
            <span className="relative grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-ink-500 to-cyan-400 shadow-[0_8px_24px_-8px_rgba(59,130,246,0.9)] transition-transform group-hover:scale-105">
              <QrCode className="h-5 w-5 text-white" strokeWidth={2.2} />
            </span>
            <span className="flex flex-col leading-none">
              <span className="font-display text-[17px] font-bold tracking-tight text-white">
                Suyu<span className="text-cyan-400">Tool</span>
              </span>
              <span className="mt-1 hidden text-[10px] font-medium uppercase tracking-[0.18em] text-ink-200/50 sm:block">
                All tools, one place
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {[
              { href: "/#tools", label: "Tools" },
              { href: "/qr/", label: "QR Studio" },
              { href: "/#tentang", label: "Tentang" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-ink-200/80 transition hover:bg-white/[0.06] hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2.5 sm:gap-3">
            <Link
              href="https://github.com/sionlimitles-spec/suyu-tool"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="hidden h-10 w-10 place-items-center rounded-xl border border-white/[0.12] text-ink-100/80 transition hover:border-white/25 hover:bg-white/[0.06] hover:text-white sm:grid"
            >
              <Github className="h-5 w-5" />
            </Link>
            <Button asChild size="sm" className="h-10 rounded-xl px-4">
              <Link href="/qr/">
                <QrCode className="h-4 w-4" />
                <span className="hidden sm:inline">Buka QR Studio</span>
                <span className="sm:hidden">Buat QR</span>
              </Link>
            </Button>
            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  );
}

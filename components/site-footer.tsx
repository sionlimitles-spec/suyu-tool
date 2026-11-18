import Link from "next/link";
import { Github, QrCode } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="relative mt-16 border-t border-white/[0.07]">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-5 py-12 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-sm">
          <div className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-ink-500 to-cyan-400">
              <QrCode className="h-4 w-4 text-white" />
            </span>
            <span className="font-display text-base font-bold text-white">
              Suyu<span className="text-cyan-400">Tool</span>
            </span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-ink-200/70">
            Kumpulan tools online yang cepat, privat, dan enak dipakai. Semua proses berjalan di
            browser kamu — tidak ada file yang diunggah ke server.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-10 text-sm">
          <div className="flex flex-col gap-3">
            <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-200/40">
              Navigasi
            </span>
            <Link className="text-ink-200/70 transition hover:text-white" href="/">
              Beranda
            </Link>
            <Link className="text-ink-200/70 transition hover:text-white" href="/#tools">
              Semua Tools
            </Link>
            <Link className="text-ink-200/70 transition hover:text-white" href="/qr/">
              QR Studio
            </Link>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-200/40">
              Proyek
            </span>
            <Link
              className="inline-flex items-center gap-1.5 text-ink-200/70 transition hover:text-white"
              href="https://github.com/sionlimitles-spec/suyu-tool"
              target="_blank"
              rel="noreferrer"
            >
              <Github className="h-3.5 w-3.5" /> GitHub
            </Link>
            <span className="text-ink-200/40">Next.js · Tailwind</span>
            <span className="text-ink-200/40">© {new Date().getFullYear()} Suyu Tool</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

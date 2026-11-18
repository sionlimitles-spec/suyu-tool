import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] w-full max-w-xl flex-col items-center justify-center px-5 text-center">
      <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-ink-200/60">
        404
      </span>
      <h1 className="mt-6 font-display text-4xl font-bold tracking-tight text-white">
        Halaman tidak ada
      </h1>
      <p className="mt-3 text-sm text-ink-200/60">
        Link-nya mungkin salah, atau halamannya sudah dipindahkan.
      </p>
      <div className="mt-8 flex gap-3">
        <Button asChild className="rounded-xl">
          <Link href="/">Kembali ke beranda</Link>
        </Button>
        <Button asChild variant="secondary" className="rounded-xl">
          <Link href="/qr/">Buka QR Studio</Link>
        </Button>
      </div>
    </div>
  );
}

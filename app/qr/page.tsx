import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { QrStudio } from "@/components/qr/qr-studio";

export const metadata: Metadata = {
  title: "QR Code Studio",
  description:
    "Buat QR code berwarna dengan gradasi, bentuk titik dan mata custom, latar transparan, lalu unduh PNG resolusi tinggi. Gratis dan diproses di browser.",
};

export default function QrPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-5 pb-10 pt-8 sm:pt-10">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-[13px] font-medium text-ink-200/70 transition hover:text-white"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> Semua tools
      </Link>

      <div className="mt-5 flex flex-col gap-2">
        <h1 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
          QR Code Studio
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-ink-200/70">
          Ubah link, teks, atau data apa pun jadi QR code yang enak dilihat. Atur warna, gradasi,
          bentuk titik, dan mata QR — semuanya langsung terlihat di pratinjau.
        </p>
      </div>

      <div className="mt-7 sm:mt-8">
        <QrStudio />
      </div>
    </div>
  );
}

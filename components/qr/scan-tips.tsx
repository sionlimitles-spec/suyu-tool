import { Info } from "lucide-react";

const TIPS = [
  {
    title: "Level koreksi error",
    body: "Makin tinggi levelnya, makin tahan QR terhadap bagian yang rusak — tapi polanya jadi lebih rapat. Untuk cetak, pakai Q atau H.",
  },
  {
    title: "Kontras itu penting",
    body: "Warna depan harus jauh lebih gelap dari latar. Hindari kombinasi terang di atas terang walau terlihat estetik.",
  },
  {
    title: "Ukuran cetak",
    body: "Untuk jarak pandang 20–30 cm, minimal 3 × 3 cm. Semakin jauh pemindaian, semakin besar cetakannya.",
  },
];

export function ScanTips() {
  return (
    <section className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-5">
      <div className="flex items-center gap-2">
        <Info className="h-4 w-4 text-cyan-300" />
        <h2 className="font-display text-sm font-semibold tracking-tight text-white">
          Biar QR-nya mudah discan
        </h2>
      </div>
      <dl className="mt-4 space-y-3.5">
        {TIPS.map((tip) => (
          <div key={tip.title}>
            <dt className="text-[13px] font-semibold text-ink-50">{tip.title}</dt>
            <dd className="mt-0.5 text-[12.5px] leading-relaxed text-ink-200/65">{tip.body}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

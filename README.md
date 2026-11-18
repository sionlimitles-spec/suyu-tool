# Suyu Tool

Kumpulan tools online modern — dimulai dari **QR Code Studio** yang bisa membuat QR berwarna, bergradasi, dengan bentuk titik dan mata custom, lalu diunduh sebagai PNG resolusi tinggi.

Dibangun dengan Next.js (static export), TypeScript, Tailwind CSS, Radix UI, dan Framer Motion. Semua proses berjalan di browser — tidak ada data yang dikirim ke server.

## Stack

| Bagian | Teknologi |
| --- | --- |
| Framework | Next.js 15 (App Router, `output: "export"`) |
| Bahasa | TypeScript (strict) |
| Styling | Tailwind CSS 3 + `tailwindcss-animate` |
| Komponen | Pola shadcn/ui + Radix UI (Slider, Switch, Slot) |
| Animasi | Framer Motion |
| Ikon | lucide-react |
| Font | Inter Variable & Space Grotesk (self-host via `@fontsource`) |
| QR engine | `qrcode-generator` + canvas renderer sendiri |

## Menjalankan

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm build      # hasil statis di folder out/
```

Butuh Node.js ≥ 18.18 (disarankan 20/22).

## Struktur

```
app/
  layout.tsx        root layout + metadata + background
  page.tsx          beranda (hero, katalog tools, fitur, CTA)
  qr/page.tsx       halaman QR Code Studio
  not-found.tsx     404
  globals.css       design token & utility
components/
  site-header.tsx   navbar sticky
  site-footer.tsx   footer
  hero.tsx          hero animasi
  qr-showcase.tsx   kartu QR contoh (canvas)
  tools-explorer.tsx katalog + pencarian + filter kategori
  qr/qr-studio.tsx  tool QR lengkap
  ui/               button, card, badge, input, slider, switch
lib/
  tools.ts          data semua tools
  qr/render.ts      renderer QR ke canvas + preset
  utils.ts          cn()
public/_headers     header cache & keamanan (Cloudflare Pages)
```

## Deploy ke Cloudflare Pages

1. Repo ini sudah terhubung ke GitHub. Buka **dash.cloudflare.com → Workers & Pages → Create → Pages → Connect to Git**.
2. Pilih repo `suyu-tool`.
3. Pengaturan build:
   - Framework preset: **Next.js (Static HTML Export)** — atau **None**
   - Build command: `npm run build`
   - Build output directory: `out`
   - Environment variable: `NODE_VERSION` = `20`
4. **Save and Deploy**.

Setiap push ke `main` akan otomatis deploy ulang.

## Menambah tool baru

1. Tambahkan entri di `lib/tools.ts` (nama, deskripsi, ikon, kategori, `status: "ready"`, `href`).
2. Buat halaman di `app/<slug>/page.tsx`.
3. Komponen client ditaruh di `components/<slug>/`.

## Lisensi

MIT

# Suyu Tool

Kumpulan tools online yang modern, cepat, dan gratis. Konsep awal (v1.0) sudah berisi **QR Code Generator** yang berfungsi penuh, sisanya menyusul.

## Fitur sekarang

- **QR Code Generator** (berfungsi penuh, 100% offline di browser):
  - Input link / teks / apa pun (mendukung teks Indonesia & emoji)
  - Level koreksi error L / M / Q / H
  - Ukuran 200–1024 px
  - Bentuk titik: kotak / kotak bulat / bulat
  - Bentuk mata (finder): kotak / kotak bulat / bulat
  - Warna depan 2 gradasi (bisa dimatikan), warna latar, dan latar transparan
  - Margin (zona tenang) 0–8 modul
  - Unduh PNG & salin gambar ke clipboard
- Tampilan biru modern dengan efek kaca (glassmorphism), tema terang/gelap, responsif.

## Cara membuka

Tanpa internet & tanpa server — cukup buka filenya:

1. Buka folder ini di HP/laptop.
2. Klik **index.html** (terbuka di browser).
   - Di HP Android: buka lewat File Manager → tahan `index.html` → Buka dengan Chrome.
   - Atau ketik di Chrome: `file:///lokasi/folder/index.html`

QR tetap jalan walau offline karena library-nya sudah disertakan di folder `vendor/` (tidak pakai CDN).

## Struktur

```
suyu-tool/
├── index.html          → halaman utama
├── css/style.css       → tampilan (warna, tema, efek kaca)
├── js/app.js           → logika QR + interaksi
├── vendor/qrcode-generator.js  → library QR (lokal, tanpa CDN)
└── README.md
```

## Cara ganti teks & warna

- **Judul / teks**: buka `index.html`, cari kata "Suyu Tool" atau teks yang mau diganti, lalu simpan.
- **Warna utama**: buka `css/style.css`, cari blok `:root` dan ubah nilai:
  - `--accent` = biru utama
  - `--accent-2` = biru muda/cyan
- **Warna default QR**: buka `js/app.js`, cari `state` di bagian atas, ubah `fg`, `fg2`, `bg`.

## Cara upload ke internet (gratis)

### Cloudflare Pages (disarankan)

1. Push folder ini ke repo GitHub (lihat bagian *Deploy* di bawah).
2. Buka `dash.cloudflare.com` → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
3. Pilih repo GitHub-nya.
4. Isi pengaturan build:
   - Framework preset: **None**
   - Build command: *(kosongkan)*
   - Build output directory: `/`
5. Klik **Save and Deploy**. Selesai — dapat URL `namarepo.pages.dev`.

Setiap kali push ke branch `main`, Cloudflare otomatis deploy ulang.

### Alternatif

1. **Netlify Drop** — buka `app.netlify.com/drop`, seret folder ini, selesai.
2. **Vercel** — taruh di repo GitHub lalu import di `vercel.com`.
3. **GitHub Pages** — push folder ini ke repo, aktifkan Pages di Settings → Pages (branch `main`, folder `/root`).

## Roadmap (tool berikutnya)

- [ ] Link pendek
- [ ] Kompres gambar
- [ ] Text tools
- [ ] Color picker
- [ ] Password generator
- [ ] Base64 encode/decode
- [ ] Konversi satuan

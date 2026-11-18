import {
  Binary,
  FileJson,
  ImageDown,
  ImagePlus,
  KeyRound,
  Link2,
  Palette,
  QrCode,
  Ruler,
  Scissors,
  Type,
  Wand2,
  type LucideIcon,
} from "lucide-react";

export type ToolStatus = "ready" | "soon";

export type ToolCategory = "Media" | "Developer" | "Teks" | "Utilitas";

export type Tool = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category: ToolCategory;
  status: ToolStatus;
  icon: LucideIcon;
  tag: string;
  /** Gradient stops for the icon tile */
  tint: [string, string];
  href?: string;
};

export const CATEGORIES: Array<ToolCategory | "Semua"> = [
  "Semua",
  "Media",
  "Developer",
  "Teks",
  "Utilitas",
];

export const TOOLS: Tool[] = [
  {
    slug: "qr",
    name: "QR Code Studio",
    tagline: "Bikin QR cantik dengan warna & bentuk custom",
    description:
      "Ubah link, teks, atau data apa pun jadi QR code berwarna, bergradasi, dengan bentuk titik dan mata yang bisa diatur. Unduh PNG resolusi tinggi.",
    category: "Media",
    status: "ready",
    icon: QrCode,
    tag: "QR",
    tint: ["#3b82f6", "#22d3ee"],
    href: "/qr/",
  },
  {
    slug: "shorten",
    name: "Link Pendek",
    tagline: "URL panjang jadi ringkas",
    description: "Perpendek tautan, pantau klik, dan kelola semua link dalam satu tempat.",
    category: "Utilitas",
    status: "soon",
    icon: Link2,
    tag: "URL",
    tint: ["#6366f1", "#3b82f6"],
  },
  {
    slug: "compress",
    name: "Kompres Gambar",
    tagline: "Kecilkan ukuran tanpa pecah",
    description: "Kurangi ukuran foto JPG/PNG/WebP langsung di browser, tanpa upload ke server.",
    category: "Media",
    status: "soon",
    icon: ImageDown,
    tag: "Image",
    tint: ["#0ea5e9", "#2563eb"],
  },
  {
    slug: "remove-bg",
    name: "Hapus Background",
    tagline: "Latar transparan otomatis",
    description: "Pisahkan objek dari latar belakang foto dengan AI yang berjalan lokal.",
    category: "Media",
    status: "soon",
    icon: ImagePlus,
    tag: "AI",
    tint: ["#8b5cf6", "#3b82f6"],
  },
  {
    slug: "resize",
    name: "Resize & Crop",
    tagline: "Potong gambar presisi",
    description: "Atur dimensi, rasio, dan area crop untuk kebutuhan feed maupun konten.",
    category: "Media",
    status: "soon",
    icon: Scissors,
    tag: "Image",
    tint: ["#06b6d4", "#3b82f6"],
  },
  {
    slug: "text",
    name: "Text Tools",
    tagline: "Format, hitung, rapikan teks",
    description: "Ubah kapitalisasi, hitung karakter, hapus spasi ganda, dan lainnya.",
    category: "Teks",
    status: "soon",
    icon: Type,
    tag: "Teks",
    tint: ["#22d3ee", "#0ea5e9"],
  },
  {
    slug: "json",
    name: "JSON Formatter",
    tagline: "Rapikan JSON dalam sekejap",
    description: "Format, validasi, minify, dan bandingkan JSON dengan tampilan yang jelas.",
    category: "Developer",
    status: "soon",
    icon: FileJson,
    tag: "Dev",
    tint: ["#3b82f6", "#6366f1"],
  },
  {
    slug: "color",
    name: "Color Picker",
    tagline: "Ambil & konversi warna",
    description: "Pilih warna lalu salin sebagai HEX, RGB, HSL, atau Tailwind palette.",
    category: "Developer",
    status: "soon",
    icon: Palette,
    tag: "Warna",
    tint: ["#a855f7", "#22d3ee"],
  },
  {
    slug: "password",
    name: "Password Generator",
    tagline: "Sandi kuat & acak",
    description: "Buat kata sandi aman dengan aturan panjang dan karakter yang kamu pilih.",
    category: "Developer",
    status: "soon",
    icon: KeyRound,
    tag: "Aman",
    tint: ["#0ea5e9", "#6366f1"],
  },
  {
    slug: "base64",
    name: "Base64",
    tagline: "Encode & decode instan",
    description: "Konversi teks, file, atau data URL ke Base64 dan sebaliknya.",
    category: "Developer",
    status: "soon",
    icon: Binary,
    tag: "Dev",
    tint: ["#2563eb", "#0ea5e9"],
  },
  {
    slug: "unit",
    name: "Konversi Satuan",
    tagline: "Panjang, berat, suhu",
    description: "Ubah satuan metrik maupun imperial dengan hasil yang instan.",
    category: "Utilitas",
    status: "soon",
    icon: Ruler,
    tag: "Satuan",
    tint: ["#38bdf8", "#3b82f6"],
  },
  {
    slug: "text-ai",
    name: "Rapikan Teks AI",
    tagline: "Bersihkan hasil chat AI",
    description: "Hapus format aneh, tanda bintang, dan spasi berlebih dari teks hasil AI.",
    category: "Teks",
    status: "soon",
    icon: Wand2,
    tag: "AI",
    tint: ["#6366f1", "#22d3ee"],
  },
];

export const READY_TOOLS = TOOLS.filter((t) => t.status === "ready");

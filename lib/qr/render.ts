import qrcode from "qrcode-generator";

export type QrEcc = "L" | "M" | "Q" | "H";
export type QrDotStyle = "square" | "rounded" | "circle";
export type QrEyeStyle = "square" | "rounded" | "circle";

export type QrDesign = {
  text: string;
  ecc: QrEcc;
  size: number;
  margin: number;
  dot: QrDotStyle;
  eye: QrEyeStyle;
  fg: string;
  fg2: string;
  bg: string;
  transparent: boolean;
  gradient: boolean;
};

export type QrRenderResult = { ok: true } | { ok: false; error: string };

/** Use UTF-8 so Indonesian text and emoji survive encoding. */
if (qrcode.stringToBytesFuncs?.["UTF-8"]) {
  qrcode.stringToBytes = qrcode.stringToBytesFuncs["UTF-8"];
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  const radius = Math.max(0, Math.min(r, w / 2, h / 2));
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + w, y, x + w, y + h, radius);
  ctx.arcTo(x + w, y + h, x, y + h, radius);
  ctx.arcTo(x, y + h, x, y, radius);
  ctx.arcTo(x, y, x + w, y, radius);
  ctx.closePath();
}

export function renderQr(canvas: HTMLCanvasElement, design: QrDesign): QrRenderResult {
  const ctx = canvas.getContext("2d");
  if (!ctx) return { ok: false, error: "Canvas tidak didukung browser ini." };

  const size = Math.max(80, Math.round(design.size));
  canvas.width = size;
  canvas.height = size;
  ctx.clearRect(0, 0, size, size);

  const text = design.text.trim();
  if (!text) return { ok: false, error: "Isi dulu teks atau link-nya." };

  let qr: ReturnType<typeof qrcode>;
  try {
    qr = qrcode(0, design.ecc);
    qr.addData(text);
    qr.make();
  } catch {
    return {
      ok: false,
      error: "Data terlalu panjang untuk level koreksi ini. Coba level L atau pendekkan teks.",
    };
  }

  const count = qr.getModuleCount();
  const margin = Math.max(0, Math.round(design.margin));
  const total = count + margin * 2;
  const m = size / total;

  if (!design.transparent) {
    ctx.fillStyle = design.bg;
    ctx.fillRect(0, 0, size, size);
  }

  let fill: string | CanvasGradient = design.fg;
  if (design.gradient) {
    const g = ctx.createLinearGradient(0, 0, size, size);
    g.addColorStop(0, design.fg);
    g.addColorStop(0.55, design.fg);
    g.addColorStop(1, design.fg2);
    fill = g;
  }

  const eyes: Array<[number, number]> = [
    [0, 0],
    [0, count - 7],
    [count - 7, 0],
  ];

  const inEye = (r: number, c: number) =>
    eyes.some(([r0, c0]) => r >= r0 && r < r0 + 7 && c >= c0 && c < c0 + 7);

  // Body modules
  ctx.fillStyle = fill;
  for (let r = 0; r < count; r++) {
    for (let c = 0; c < count; c++) {
      if (!qr.isDark(r, c)) continue;
      if (inEye(r, c)) continue;

      const x = (c + margin) * m;
      const y = (r + margin) * m;

      if (design.dot === "square") {
        ctx.fillRect(x, y, m, m);
      } else if (design.dot === "circle") {
        ctx.beginPath();
        ctx.arc(x + m / 2, y + m / 2, m / 2 - m * 0.06, 0, Math.PI * 2);
        ctx.fill();
      } else {
        const inset = m * 0.06;
        roundRect(ctx, x + inset, y + inset, m - inset * 2, m - inset * 2, m * 0.34);
        ctx.fill();
      }
    }
  }

  // Finder patterns (eyes)
  for (const [r0, c0] of eyes) {
    const x = (c0 + margin) * m;
    const y = (r0 + margin) * m;
    const w = 7 * m;

    ctx.fillStyle = fill;
    ctx.strokeStyle = fill;
    ctx.lineWidth = m;

    if (design.eye === "circle") {
      ctx.beginPath();
      ctx.arc(x + w / 2, y + w / 2, w / 2 - m / 2, 0, Math.PI * 2);
      ctx.stroke();
    } else if (design.eye === "rounded") {
      roundRect(ctx, x + m / 2, y + m / 2, w - m, w - m, m * 1.6);
      ctx.stroke();
    } else {
      ctx.strokeRect(x + m / 2, y + m / 2, w - m, w - m);
    }

    const cx = x + 2 * m;
    const cy = y + 2 * m;
    const cw = 3 * m;

    if (design.eye === "circle") {
      ctx.beginPath();
      ctx.arc(cx + cw / 2, cy + cw / 2, cw / 2, 0, Math.PI * 2);
      ctx.fill();
    } else if (design.eye === "rounded") {
      roundRect(ctx, cx, cy, cw, cw, m * 1.05);
      ctx.fill();
    } else {
      ctx.fillRect(cx, cy, cw, cw);
    }
  }

  return { ok: true };
}

export const QR_PRESETS = [
  { name: "Samudra", fg: "#0b3bd6", fg2: "#22d3ee", dot: "rounded", eye: "rounded" },
  { name: "Neon", fg: "#22d3ee", fg2: "#a855f7", dot: "circle", eye: "circle" },
  { name: "Malam", fg: "#0f172a", fg2: "#334155", dot: "rounded", eye: "rounded" },
  { name: "Senja", fg: "#f97316", fg2: "#ec4899", dot: "circle", eye: "rounded" },
  { name: "Hutan", fg: "#059669", fg2: "#65a30d", dot: "rounded", eye: "square" },
  { name: "Klasik", fg: "#000000", fg2: "#000000", dot: "square", eye: "square" },
] as const;

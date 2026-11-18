const http = require("http");
const fs = require("fs");
const path = require("path");
const { chromium } = require("playwright-core");
const root = path.resolve("out");
const mime = { ".html":"text/html", ".js":"text/javascript", ".css":"text/css", ".svg":"image/svg+xml", ".woff2":"font/woff2", ".png":"image/png" };
const server = http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split("?")[0]); if (p.endsWith("/")) p += "index.html";
  let f = path.join(root, p);
  if (!fs.existsSync(f)) { res.writeHead(404); return res.end("nf"); }
  if (fs.statSync(f).isDirectory()) f = path.join(f, "index.html");
  res.writeHead(200, { "content-type": mime[path.extname(f)] || "application/octet-stream" });
  fs.createReadStream(f).pipe(res);
});
const hash = (page) => page.evaluate(() => {
  const c = document.querySelector("canvas"); const d = c.getContext("2d").getImageData(0, 0, c.width, c.height).data;
  let h = 0, opaque = 0; for (let i = 0; i < d.length; i += 4) { h = (h * 31 + d[i] + d[i + 1] * 7 + d[i + 3] * 13) >>> 0; if (d[i + 3] > 10) opaque++; }
  return { h, opaque, total: d.length / 4 };
});
(async () => {
  await new Promise((r) => server.listen(8099, "127.0.0.1", r));
  const browser = await chromium.launch({ executablePath: process.env.CHROME, args: ["--no-sandbox", "--disable-dev-shm-usage"] });
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 1000 }, acceptDownloads: true });
  const page = await ctx.newPage();
  const log = {};
  await page.goto("http://127.0.0.1:8099/qr/", { waitUntil: "networkidle" });
  await page.waitForTimeout(800);
  log.initial = await hash(page);

  await page.fill("#qr-text", "Halo Suyu Tool! Toko kopi kami buka 08.00 🚀");
  await page.waitForTimeout(400);
  log.afterText = await hash(page);

  await page.selectOption("#qr-dot", "circle");
  await page.selectOption("#qr-eye", "circle");
  await page.waitForTimeout(400);
  log.afterShape = await hash(page);

  await page.getByRole("button", { name: "Neon" }).click();
  await page.waitForTimeout(400);
  log.afterPreset = await hash(page);

  const canvas = page.locator("canvas").first();
  await canvas.screenshot({ path: "/root/workspace/shots/studio-canvas.png" });

  const dl = page.waitForEvent("download", { timeout: 8000 });
  await page.getByRole("button", { name: /Unduh PNG/ }).click();
  const download = await dl;
  const p = await download.path();
  log.download = { name: download.suggestedFilename(), bytes: fs.statSync(p).size };

  await page.getByRole("switch", { name: "Latar transparan" }).click();
  await page.waitForTimeout(400);
  log.afterTransparent = await hash(page);

  await page.getByRole("switch", { name: "Gradasi" }).click();
  await page.waitForTimeout(300);
  log.afterNoGradient = await hash(page);

  await page.screenshot({ path: "/root/workspace/shots/qr-interactive-desktop.png", fullPage: true });
  const card = page.locator("main .lg\\:sticky").first();
  await card.screenshot({ path: "/root/workspace/shots/studio-preview.png" }).catch(() => {});
  console.log(JSON.stringify(log, null, 1));
  await browser.close(); server.close();
})().catch((e) => { console.error("FAIL", e.message); process.exit(1); });

/**
 * Renders story.html to public/pipeline-video.mp4 (H.264) + .webm (VP9) + poster, 1920×1080 @ 30fps.
 *
 *   node video/pipeline/render.mjs              # full render
 *   node video/pipeline/render.mjs --stills     # just PNG stills of key moments (fast check)
 *
 * render.mjs writes the picture only; then run voiceover.py to add the narration track.
 *
 * Needs ffmpeg on PATH and Playwright. If Playwright isn't installed in the project, point to it:
 *   PLAYWRIGHT_MODULE=/path/to/node_modules/playwright/index.mjs CHROMIUM_PATH=/path/to/chrome node video/pipeline/render.mjs
 */
import { spawn } from "node:child_process";
import { mkdirSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const { chromium } = await import(process.env.PLAYWRIGHT_MODULE ?? "playwright");

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, "..", "..");
const OUT = join(ROOT, "public");
const FPS = 30;
const W = 1920, H = 1080;

const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined });
const page = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 1 });
await page.goto(pathToFileURL(join(HERE, "story.html")).href);
await page.evaluate(() => document.fonts.ready);
const DURATION = await page.evaluate(() => window.DURATION);
const frame = async (t) => {
  await page.evaluate((t) => window.seek(t), t);
  return page.screenshot({ type: "png" });
};

if (process.argv.includes("--stills")) {
  const dir = join(HERE, "stills");
  rmSync(dir, { recursive: true, force: true });
  mkdirSync(dir, { recursive: true });
  for (const t of [2.8, 9.8, 15.8, 22.0, 28.0, 33.5, 41.0]) {
    await page.evaluate((t) => window.seek(t), t);
    await page.screenshot({ path: join(dir, `t${t}.png`) });
  }
  console.log("stills written to", dir);
  await browser.close();
  process.exit(0);
}

// 1) frames → lossless-ish intermediate (fast), 2) encode the two delivery formats from it
const tmp = join(HERE, ".render");
mkdirSync(tmp, { recursive: true });
const master = join(tmp, "master.mkv");
const ff = (args) =>
  new Promise((res, rej) => {
    const p = spawn("ffmpeg", ["-hide_banner", "-loglevel", "error", "-y", ...args], { stdio: ["pipe", "inherit", "inherit"] });
    p.on("exit", (c) => (c === 0 ? res() : rej(new Error("ffmpeg exited " + c))));
    return p;
  });

const enc = spawn("ffmpeg", ["-hide_banner", "-loglevel", "error", "-y", "-f", "image2pipe", "-framerate", String(FPS), "-i", "-",
  "-c:v", "libx264", "-preset", "veryfast", "-qp", "0", "-pix_fmt", "yuv444p", master], { stdio: ["pipe", "inherit", "inherit"] });
const done = new Promise((res, rej) => enc.on("exit", (c) => (c === 0 ? res() : rej(new Error("ffmpeg exited " + c)))));
const total = Math.round(DURATION * FPS);
for (let i = 0; i < total; i++) {
  const buf = await frame(i / FPS);
  if (!enc.stdin.write(buf)) await new Promise((r) => enc.stdin.once("drain", r));
  if (i % 150 === 0) console.log(`frame ${i}/${total}`);
}
enc.stdin.end();
await done;
await browser.close();

console.log("encoding mp4…");
await ff(["-i", master, "-c:v", "libx264", "-preset", "slow", "-crf", "20", "-pix_fmt", "yuv420p", "-r", String(FPS),
  "-movflags", "+faststart", "-an", join(OUT, "pipeline-video.mp4")]);
console.log("encoding webm…");
await ff(["-i", master, "-c:v", "libvpx-vp9", "-crf", "34", "-b:v", "0", "-row-mt", "1", "-deadline", "good", "-cpu-used", "2",
  "-pix_fmt", "yuv420p", "-r", String(FPS), "-an", join(OUT, "pipeline-video.webm")]);
console.log("poster…");
await ff(["-ss", "2.8", "-i", master, "-frames:v", "1", "-q:v", "3", join(OUT, "pipeline-video-poster.jpg")]);
await ff(["-ss", "2.8", "-i", master, "-frames:v", "1", "-c:v", "libwebp", "-quality", "78", join(OUT, "pipeline-video-poster.webp")]);
rmSync(tmp, { recursive: true, force: true });
console.log("done");

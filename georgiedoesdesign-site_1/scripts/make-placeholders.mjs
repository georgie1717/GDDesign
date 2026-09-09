/**
 * Generates labelled placeholder images so the site builds and you can see the
 * layout before your real exports are in place. Each placeholder tells you the
 * filename to overwrite it with.
 *
 * Run with:  node scripts/make-placeholders.mjs
 * Safe to re-run: it skips any file that is no longer a placeholder.
 */
import sharp from 'sharp';
import { mkdir, writeFile, readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

const PUB = 'public';

const targets = [
  { file: 'images/georgie.jpg', w: 612, h: 720, label: 'Portrait photo' },
  { file: 'images/og-default.png', w: 1200, h: 630, label: 'Social share image' },

  { file: 'images/work/checkout-conversion/thumb.png', w: 1200, h: 825, label: 'Card thumbnail' },
  { file: 'images/work/checkout-conversion/hero.png', w: 1400, h: 1000, label: 'Hero image' },
  { file: 'images/work/checkout-conversion/existing-journey.png', w: 1600, h: 900, label: 'Journey map' },
  { file: 'images/work/checkout-conversion/otp-flow.png', w: 1600, h: 900, label: 'OTP screens' },
  { file: 'images/work/checkout-conversion/auth-flow.png', w: 1600, h: 900, label: 'Auth flow' },
  { file: 'images/work/checkout-conversion/partner-attribution.png', w: 1600, h: 900, label: 'Partner step' },
  { file: 'images/work/checkout-conversion/solution-overview.png', w: 1600, h: 900, label: 'Solution overview' },

  { file: 'images/work/partner-cart/thumb.png', w: 1200, h: 825, label: 'Card thumbnail' },
  { file: 'images/work/partner-cart/hero.png', w: 1400, h: 1000, label: 'Hero image' },
  { file: 'images/work/partner-cart/screens.png', w: 1600, h: 900, label: 'App screens' },

  { file: 'images/work/bloomsbury/thumb.png', w: 1200, h: 825, label: 'Card thumbnail' },
  { file: 'images/work/bloomsbury/hero.png', w: 1400, h: 1000, label: 'Hero image' },
  { file: 'images/work/bloomsbury/screens.png', w: 1600, h: 900, label: 'Website screens' },

  { file: 'images/work/additional/thumb.png', w: 1200, h: 825, label: 'Card thumbnail' },
  { file: 'images/work/additional/hero.png', w: 1400, h: 1000, label: 'Hero image' },
  { file: 'images/work/additional/project-one.png', w: 1600, h: 900, label: 'Project image' },
  { file: 'images/work/additional/project-two.png', w: 1600, h: 900, label: 'Project image' },
];

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');

function svg(w, h, label, file) {
  const titleSize = Math.max(20, Math.round(w / 26));
  const pathSize = Math.max(13, Math.round(w / 48));
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <rect width="${w}" height="${h}" fill="#efece6"/>
  <rect x="1" y="1" width="${w - 2}" height="${h - 2}" fill="none" stroke="#d8d2c6" stroke-width="2" stroke-dasharray="14 10"/>
  <circle cx="${w / 2}" cy="${h / 2 - titleSize * 1.5}" r="${titleSize * 0.7}" fill="#ff9d00"/>
  <text x="50%" y="${h / 2 + titleSize * 0.4}" text-anchor="middle" font-family="DM Sans, Helvetica, Arial, sans-serif" font-size="${titleSize}" fill="#131110">${esc(label)}</text>
  <text x="50%" y="${h / 2 + titleSize * 1.6 + pathSize}" text-anchor="middle" font-family="DM Sans, Helvetica, Arial, sans-serif" font-size="${pathSize}" fill="#6e6559">replace with  public/${esc(file)}</text>
  <text x="50%" y="${h / 2 + titleSize * 1.6 + pathSize * 2.6}" text-anchor="middle" font-family="DM Sans, Helvetica, Arial, sans-serif" font-size="${pathSize}" fill="#8d8577">${w} x ${h}px</text>
</svg>`;
}

let made = 0;
let skipped = 0;

for (const t of targets) {
  const out = path.join(PUB, t.file);
  await mkdir(path.dirname(out), { recursive: true });

  if (existsSync(out)) {
    // Only overwrite files we generated ourselves.
    const marker = path.join(path.dirname(out), `.placeholder-${path.basename(out)}`);
    if (!existsSync(marker)) {
      skipped++;
      continue;
    }
  }

  const buf = Buffer.from(svg(t.w, t.h, t.label, t.file));
  const img = sharp(buf).resize(t.w, t.h);
  const bytes = t.file.endsWith('.jpg')
    ? await img.jpeg({ quality: 82 }).toBuffer()
    : await img.png().toBuffer();

  await writeFile(out, bytes);
  await writeFile(
    path.join(path.dirname(out), `.placeholder-${path.basename(out)}`),
    'generated placeholder, delete this file once you replace the image\n'
  );
  made++;
}

console.log(`placeholders written: ${made}, left alone (yours): ${skipped}`);

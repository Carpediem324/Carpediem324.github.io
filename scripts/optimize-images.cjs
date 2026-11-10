const fs = require("node:fs/promises");
const path = require("node:path");
const { createHash } = require("node:crypto");
const sharp = require("sharp");

const root = path.resolve(__dirname, "..");
const imagesRoot = path.join(root, "public", "assets", "images");
const outputRoot = path.join(imagesRoot, "optimized");

async function main() {
  await fs.mkdir(outputRoot, { recursive: true });
  const projects = (await fs.readdir(path.join(imagesRoot, "projects")))
    .filter((file) => /\.(jpg|jpeg|png)$/i.test(file)).sort();
  const sources = [
    ...projects.map((file) => ({ file: `projects/${file}`, widths: [480, 960, 1440] })),
    { file: "profile/hyeonhak-shin.jpg", widths: [96, 256, 512] },
    { file: "hero/road-day.jpg", widths: [768, 1440, 1920] },
    { file: "hero/road-night.jpg", widths: [768, 1440, 1920] },
  ];
  const manifest = {};
  let originalBytes = 0;
  let largestVariantBytes = 0;

  for (const { file, widths } of sources) {
    const input = await fs.readFile(path.join(imagesRoot, file));
    const metadata = await sharp(input).metadata();
    const width = [5, 6, 7, 8].includes(metadata.orientation) ? metadata.height : metadata.width;
    const targets = [...new Set(widths.map((target) => Math.min(target, width)))];
    const digest = createHash("sha256").update(input).update(JSON.stringify({ targets, quality: 82 })).digest("hex").slice(0, 10);
    const stem = path.parse(file).name;
    const variants = [];
    for (const target of targets) {
      const filename = `${stem}-${digest}-${target}.webp`;
      const info = await sharp(input).rotate().resize({ width: target, withoutEnlargement: true })
        .webp({ quality: 82, effort: 5 }).toFile(path.join(outputRoot, filename));
      variants.push({ src: `/assets/images/optimized/${filename}`, width: info.width, height: info.height, bytes: info.size });
    }
    const largest = variants.at(-1);
    const preferred = variants.find((variant) => variant.width >= 960) ?? largest;
    manifest[`/assets/images/${file}`] = {
      src: preferred.src,
      srcSet: variants.map((variant) => `${variant.src} ${variant.width}w`).join(", "),
      width: largest.width,
      height: largest.height,
    };
    originalBytes += input.length;
    largestVariantBytes += largest.bytes;
  }

  await fs.writeFile(path.join(root, "src", "image-assets.json"), `${JSON.stringify(manifest, null, 2)}\n`);
  const icon = await fs.readFile(path.join(root, "public", "favicon.svg"));
  await sharp(icon).resize(32, 32).png().toFile(path.join(root, "public", "favicon-32.png"));
  await sharp(icon).resize(180, 180).png().toFile(path.join(root, "public", "apple-touch-icon.png"));
  console.log(`Optimized ${sources.length} images: ${originalBytes} original bytes → ${largestVariantBytes} bytes at largest sizes.`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const dist = path.join(root, "dist");
const distHtml = path.join(dist, "index.dev.html");
const pagesHtml = path.join(root, "index.html");
const distPagesHtml = path.join(dist, "index.html");
const distAssets = path.join(dist, "assets");
const pagesAssets = path.join(root, "assets");

if (!fs.existsSync(distHtml)) {
  throw new Error("Build output missing: dist/index.dev.html");
}

fs.copyFileSync(distHtml, pagesHtml);
fs.copyFileSync(distHtml, distPagesHtml);

if (!fs.existsSync(pagesAssets)) {
  fs.mkdirSync(pagesAssets, { recursive: true });
}

for (const entry of fs.readdirSync(pagesAssets)) {
  if (/^index(?:\.dev)?-.*\.(js|css)$/.test(entry)) {
    fs.rmSync(path.join(pagesAssets, entry), { force: true });
  }
}

fs.cpSync(distAssets, pagesAssets, { recursive: true });

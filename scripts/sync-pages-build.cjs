const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const dist = path.join(root, "dist");
const pagesHtml = path.join(root, "index.html");
const distPagesHtml = path.join(dist, "index.html");
const distAssets = path.join(dist, "assets");
const pagesAssets = path.join(root, "assets");

if (!fs.existsSync(distAssets)) {
  throw new Error("Build output missing: dist/assets");
}

fs.copyFileSync(pagesHtml, distPagesHtml);

if (!fs.existsSync(pagesAssets)) {
  fs.mkdirSync(pagesAssets, { recursive: true });
}

for (const entry of fs.readdirSync(pagesAssets)) {
  if (/^(app|index(?:\.dev)?-.*)\.(js|css)$/.test(entry)) {
    fs.rmSync(path.join(pagesAssets, entry), { force: true });
  }
}

fs.cpSync(distAssets, pagesAssets, { recursive: true });

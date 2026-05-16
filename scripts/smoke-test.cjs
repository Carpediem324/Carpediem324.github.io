const { spawn } = require("node:child_process");
const { setTimeout: delay } = require("node:timers/promises");
const { chromium } = require("playwright");

const BASE_URL = "http://127.0.0.1:5173";

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

async function waitForServer(timeoutMs = 30000) {
  const startedAt = Date.now();
  while (Date.now() - startedAt < timeoutMs) {
    try {
      const response = await fetch(BASE_URL);
      if (response.ok) return;
    } catch {
      await delay(250);
    }
  }
  throw new Error(`Timed out waiting for ${BASE_URL}`);
}

async function runSmokeChecks() {
  const browser = await chromium.launch({ channel: "chrome", headless: true });
  try {
    const desktop = await browser.newPage({ viewport: { width: 1280, height: 900 } });
    await desktop.goto(BASE_URL, { waitUntil: "networkidle" });

    const rootText = await desktop.locator("#root").innerText();
    assert(rootText.length > 1000, "App root did not render meaningful content");

    await desktop.getByRole("button", { name: "Language toggle" }).click();
    await desktop.getByRole("heading", { name: "Building robot software from sensor data to motion control." }).waitFor();
    await desktop.getByRole("button", { name: "Language toggle" }).click();

    await desktop.locator(".nav-tabs button").nth(1).click();
    await desktop.getByRole("link", { name: "imur.navigator@gmail.com" }).waitFor();
    const linkedInHref = await desktop.getByRole("link", { name: /linkedin\.com\/in/ }).getAttribute("href");
    assert(/linkedin\.com\/in\/.+138298299/.test(linkedInHref), "LinkedIn profile link is missing or malformed");

    await desktop.locator(".nav-tabs button").nth(2).click();
    await desktop.locator(".project-card").first().waitFor();
    assert((await desktop.locator(".project-card").count()) === 10, "Expected 10 project cards");

    const loadedImages = await desktop.locator(".project-media img").evaluateAll((images) =>
      images.map((image) => ({ src: image.getAttribute("src"), width: image.naturalWidth })),
    );
    assert(loadedImages.length > 0 && loadedImages.every((image) => image.width > 0), "At least one project image failed to load");

    const gaemiCard = desktop.locator(".project-card", { hasText: "GAEMI" }).first();
    const gaemiImage = gaemiCard.locator(".project-media img");
    assert((await gaemiImage.getAttribute("src")) === "/assets/images/projects/gaemi-1.jpg", "GAEMI first image mismatch");
    await gaemiCard.locator(".project-media").click();
    assert((await gaemiImage.getAttribute("src")) === "/assets/images/projects/gaemi-2.jpg", "GAEMI carousel did not advance");

    const dobotFit = await desktop
      .locator(".project-card", { hasText: "Dobot" })
      .first()
      .locator(".project-media img")
      .evaluate((image) => getComputedStyle(image).objectFit);
    assert(dobotFit === "contain", "Dobot image should render without cropping");

    const mobile = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true });
    await mobile.goto(BASE_URL, { waitUntil: "networkidle" });
    const mobileTopbar = await mobile.evaluate(() => {
      const pick = (selector) => {
        const rect = document.querySelector(selector).getBoundingClientRect();
        return { top: Math.round(rect.top), bottom: Math.round(rect.bottom) };
      };
      const brand = pick(".brand");
      const lang = pick(".lang-btn");
      const theme = pick(".icon-btn");
      const nav = pick(".nav-tabs");
      return {
        controlsShareRow: brand.bottom > lang.top && brand.top < lang.bottom && brand.bottom > theme.top && brand.top < theme.bottom,
        navBelowControls: nav.top > lang.bottom,
      };
    });
    assert(mobileTopbar.controlsShareRow, "Mobile topbar controls wrapped onto separate rows");
    assert(mobileTopbar.navBelowControls, "Mobile nav should sit below the top controls");
  } finally {
    await browser.close();
  }
}

async function main() {
  const server = spawn(process.execPath, ["./node_modules/vite/bin/vite.js", "--host", "127.0.0.1"], {
    cwd: process.cwd(),
    shell: false,
    stdio: "ignore",
    windowsHide: true,
  });

  try {
    await waitForServer();
    await runSmokeChecks();
    console.log("Smoke checks passed");
  } finally {
    server.kill();
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

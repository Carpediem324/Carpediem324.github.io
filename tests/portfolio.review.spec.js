const { test, expect } = require("@playwright/test");

test.beforeEach(async ({ page }) => {
  await page.route("https://*.goatcounter.com/**", (route) => route.fulfill({ json: { count: "0" } }));
});

test("navigation and content fit at responsive breakpoints in both languages", async ({ page }) => {
  const overflows = [];
  await page.goto("/");
  for (const lang of ["ko", "en"]) {
    await expect(page.locator("html")).toHaveAttribute("lang", lang);
    for (const width of [320, 390, 640, 641, 720, 768, 900, 901, 1024, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      for (const destination of ["home", "profile", "projects"]) {
        await page.goto(`/#${destination}`);
        await expect(page.locator(".nav-tabs [aria-current=page]")).toHaveAttribute("href", `#${destination}`);
        const dimensions = await page.evaluate(() => {
          const topbar = document.querySelector(".topbar").getBoundingClientRect();
          const controls = [...document.querySelectorAll(".topbar button, .topbar a")];
          return {
            overflow: document.documentElement.scrollWidth - innerWidth,
            controlsOutside: controls.some((control) => {
              const rect = control.getBoundingClientRect();
              return rect.right > topbar.right || rect.left < topbar.left;
            }),
          };
        });
        if (dimensions.overflow > 1 || dimensions.controlsOutside) overflows.push({ lang, width, destination, ...dimensions });
      }
    }
    if (lang === "ko") await page.getByRole("button", { name: "Language toggle" }).click();
  }
  expect(overflows).toEqual([]);
});

test("failed project images have a fallback and the gallery remains usable", async ({ page }) => {
  await page.route("**/optimized/robocop-1-*", (route) => route.abort());
  await page.goto("/#projects");
  const card = page.locator(".project-card", { hasText: "ROBOCOP" });
  await expect(card.locator(".media-fallback")).toBeVisible();
  await expect(card.locator(".project-media img")).toHaveCount(0);
  await card.getByRole("button", { name: "Next image" }).click();
  await expect(card.locator(".project-media img")).toHaveAttribute("src", /robocop-2/);
  await expect.poll(() => card.locator(".project-media img").evaluate((image) => image.naturalWidth)).toBeGreaterThan(0);
});

test("small accent text has readable contrast in light mode", async ({ page }) => {
  await page.goto("/");
  const ratio = await page.locator(".career-item > span").first().evaluate((element) => {
    const luminance = (color) => {
      const rgb = color.match(/[\d.]+/g).slice(0, 3).map(Number).map((value) => {
        const channel = value / 255;
        return channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
      });
      return rgb[0] * 0.2126 + rgb[1] * 0.7152 + rgb[2] * 0.0722;
    };
    const foreground = luminance(getComputedStyle(element).color);
    const background = luminance(getComputedStyle(element.closest(".career-card")).backgroundColor);
    return (Math.max(foreground, background) + 0.05) / (Math.min(foreground, background) + 0.05);
  });
  expect(ratio).toBeGreaterThanOrEqual(4.5);
});

test("saved theme and language apply before the application bundle", async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem("portfolio-theme", "dark");
    localStorage.setItem("portfolio-language", "en");
  });
  await page.route("**/assets/app.js*", (route) => route.abort());
  await page.goto("/");
  await expect(page.locator("#root")).toBeEmpty();
  await expect(page.locator("html")).toHaveClass("dark");
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
});

test("offscreen project images are deferred and load on scroll", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  const requested = [];
  page.on("request", (request) => {
    if (request.url().includes("/assets/images/")) requested.push(new URL(request.url()).pathname);
  });
  await page.goto("/");
  const rover = page.locator(".project-card", { hasText: "우주탐사로버" }).locator("img");
  await expect(rover).toHaveAttribute("loading", "lazy");
  expect(requested.some((url) => url.includes("kaeri-rover-panel-1-"))).toBe(false);
  await rover.scrollIntoViewIfNeeded();
  await expect.poll(() => rover.evaluate((image) => image.naturalWidth)).toBeGreaterThan(0);
});

const { test, expect } = require("@playwright/test");

async function configureCounter(page, siteCode = "counter-test") {
  // Change only the served bundle; never write test credentials to source/build.
  await page.route("**/assets/app.js*", async (route) => {
    const response = await route.fetch();
    await route.fulfill({ response, body: (await response.text()).replace(/(["'`])carpediem324\1/g, (_, quote) => `${quote}${siteCode}${quote}`) });
  });
}

test("unconfigured counter makes no external requests and fits narrow screens", async ({ page }) => {
  await configureCounter(page, "YOUR_GOATCOUNTER_CODE");
  const requests = [];
  page.on("request", (request) => {
    if (/goatcounter\.com|gc\.zgo\.at/.test(request.url())) requests.push(request.url());
  });
  await page.setViewportSize({ width: 320, height: 740 });
  await page.goto("/");
  await expect(page.locator(".visitor-counter dd")).toHaveText(["--", "--"]);
  await expect(page.locator(".visitor-counter")).toHaveCSS("position", "static");
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  expect(requests).toEqual([]);
});

test("public counts use a UTC day and stay outside desktop content", async ({ page }) => {
  await configureCounter(page);
  const requests = [];
  await page.route("https://counter-test.goatcounter.com/counter/**", async (route) => {
    const url = new URL(route.request().url());
    requests.push(url);
    await route.fulfill({ headers: { "access-control-allow-origin": "*" }, json: { count: url.searchParams.has("start") ? "0" : "1,284" } });
  });
  await page.setViewportSize({ width: 1600, height: 900 });
  await page.goto("/");
  await expect(page.locator(".visitor-counter dd")).toHaveText(["0", "1,284"]);
  expect(requests).toHaveLength(2);
  const today = requests.find((url) => url.searchParams.has("start"));
  expect(today.searchParams.get("start")).toBe(new Date().toISOString().slice(0, 10));
  expect(today.searchParams.has("end")).toBe(false);
  expect(decodeURIComponent(today.pathname)).toBe("/counter//.json");
  const widget = await page.locator(".visitor-counter").boundingBox();
  const shell = await page.locator(".app-shell").boundingBox();
  expect(widget.x).toBeGreaterThanOrEqual(shell.x + shell.width);
  await page.getByRole("button", { name: "Theme toggle" }).click();
  await expect(page.locator(".visitor-counter")).toHaveCSS("background-color", "rgb(17, 24, 39)");
});

test("failed or malformed counters leave the portfolio usable", async ({ page }) => {
  await configureCounter(page);
  await page.route("https://counter-test.goatcounter.com/counter/**", async (route) => {
    if (route.request().url().includes("start=")) await route.fulfill({ status: 503, body: "unavailable" });
    else await route.fulfill({ json: { count: "<img src=x>" } });
  });
  await page.goto("/");
  await expect(page.locator(".visitor-counter dd")).toHaveText(["--", "--"]);
  await page.locator(".nav-tabs button").nth(2).click();
  await expect(page.locator(".project-card")).toHaveCount(10);
  await expect(page.locator(".visitor-counter img")).toHaveCount(0);
});

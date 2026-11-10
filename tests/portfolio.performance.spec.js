const { test, expect } = require("@playwright/test");

for (const [name, viewport, deviceScaleFactor] of [
  ["mobile", { width: 390, height: 844 }, 2],
  ["desktop", { width: 1280, height: 900 }, 1],
]) {
  test(`${name} image loading budget`, async ({ browser }, testInfo) => {
    const context = await browser.newContext({ viewport, deviceScaleFactor });
    const page = await context.newPage();
    await page.route("https://*.goatcounter.com/**", (route) => route.fulfill({ json: { count: "0" } }));
    await page.goto("http://127.0.0.1:5173/", { waitUntil: "networkidle" });
    const imageBytes = () => page.evaluate(() => performance.getEntriesByType("resource")
      .filter((entry) => entry.name.includes("/assets/images/"))
      .reduce((sum, entry) => sum + entry.encodedBodySize, 0));
    const initialImageBytes = await imageBytes();
    for (const card of await page.locator(".project-card").all()) {
      await card.scrollIntoViewIfNeeded();
      await card.locator("img").evaluateAll((images) => Promise.all(images.map((image) => image.decode())));
    }
    const totalImageBytes = await imageBytes();
    const requestedImages = await page.evaluate(() => performance.getEntriesByType("resource")
      .filter((entry) => entry.name.includes("/assets/images/")).map((entry) => entry.name));
    await page.evaluate(() => scrollTo(0, 0));
    await page.screenshot({ path: testInfo.outputPath(`${name}.png`), fullPage: true });
    console.log(JSON.stringify({ viewport: name, initialImageBytes, totalImageBytes }));
    expect(totalImageBytes).toBeGreaterThan(0);
    expect(initialImageBytes).toBeLessThan(350000);
    expect(totalImageBytes).toBeLessThan(650000);
    expect(requestedImages.every((url) => url.endsWith(".webp"))).toBe(true);
    await context.close();
  });
}

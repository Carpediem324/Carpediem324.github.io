const { test, expect } = require("@playwright/test");

test("shared pages, history, and preferences survive reload", async ({ page }) => {
  await page.goto("/#projects");
  await expect(page.locator(".project-card")).toHaveCount(10);
  await page.getByRole("button", { name: "Language toggle" }).click();
  await page.getByRole("button", { name: "Theme toggle" }).click();
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.locator("html")).toHaveClass("dark");
  await expect(page.getByRole("heading", { name: "Projects", exact: true })).toBeVisible();
  await page.getByRole("button", { name: "Profile", exact: true }).click();
  await expect(page).toHaveURL(/#profile$/);
  await expect(page.locator("main")).toBeFocused();
  await page.goBack();
  await expect(page.getByRole("heading", { name: "Projects", exact: true })).toBeVisible();
  await expect(page.getByRole("button", { name: "Projects", exact: true })).toHaveAttribute("aria-current", "page");
});

test("search finds skills in both languages and recovers from empty results", async ({ page }) => {
  await page.goto("/#projects");
  const search = page.getByRole("searchbox");
  await search.fill("  pure pursuit  ");
  await expect(page.locator(".project-card")).toHaveCount(1);
  await expect(page.locator(".project-card")).toContainText("ROBOCOP");
  await search.fill("no-such-project-xyz");
  await expect(page.getByText("일치하는 프로젝트가 없습니다")).toBeVisible();
  await page.getByRole("button", { name: "전체 프로젝트 보기" }).click();
  await expect(page.locator(".project-card")).toHaveCount(10);
  await search.fill("재난지역");
  await page.getByRole("button", { name: "Language toggle" }).click();
  await expect(page.locator(".project-card")).toHaveCount(1);
  await expect(page.locator(".project-card")).toContainText("GAEMI");
});

test("gallery buttons support keyboard navigation without nested buttons", async ({ page }) => {
  await page.goto("/#projects");
  const card = page.locator(".project-card", { hasText: "GAEMI" });
  const next = card.getByRole("button", { name: "Next image" });
  const photo = card.locator("img");
  await next.focus();
  await expect(next).toHaveCSS("opacity", "1");
  await next.press("Enter");
  await expect(photo).toHaveAttribute("src", /gaemi-2/);
  await next.press("ArrowLeft");
  await expect(photo).toHaveAttribute("src", /gaemi-1/);
  await next.press("ArrowLeft");
  await expect(photo).toHaveAttribute("src", /gaemi-3/);
  await expect(page.locator("button button, [role=button] button")).toHaveCount(0);
});

test("narrow screens remain readable across pages and languages", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 740 });
  await page.goto("/");
  for (const language of ["ko", "en"]) {
    for (const destination of ["home", "profile", "projects"]) {
      await page.goto(`/#${destination}`);
      await expect(page.locator("main")).toBeVisible();
      await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      await expect(page.locator("footer a[href^='mailto:']")).toBeVisible();
    }
    if (language === "ko") await page.getByRole("button", { name: "Language toggle" }).click();
  }
});

test("career remains newest first and pages render without application errors", async ({ page }, testInfo) => {
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.route("https://*.goatcounter.com/**", (route) => route.fulfill({ json: { count: "0" } }));
  await page.goto("/");
  await expect(page.locator(".career-item > span")).toHaveText(["현재", "2024.07 - 2025.06", "2024.01 - 2024.06", "2023"]);
  await page.locator("img").evaluateAll((images) => Promise.all(images.map((image) => image.decode())));
  await page.screenshot({ path: testInfo.outputPath("home-desktop.png"), fullPage: true });
  await page.getByRole("button", { name: "Theme toggle" }).click();
  await expect(page.locator("html")).toHaveClass("dark");
  await page.screenshot({ path: testInfo.outputPath("home-dark.png"), fullPage: true });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole("button", { name: "Theme toggle" }).click();
  await expect(page.locator("html")).not.toHaveClass("dark");
  await page.screenshot({ path: testInfo.outputPath("home-mobile.png"), fullPage: true });
  expect(errors).toEqual([]);
});

test("blocked storage does not prevent navigation", async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(window, "localStorage", { get() { throw new Error("Storage unavailable"); } });
  });
  await page.goto("/");
  await page.getByRole("button", { name: "프로젝트", exact: true }).click();
  await expect(page.locator(".project-card")).toHaveCount(10);
  await page.getByRole("button", { name: "Theme toggle" }).click();
  await expect(page.locator("html")).toHaveClass("dark");
});

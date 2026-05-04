const { test, expect } = require("@playwright/test");
const path = require("path");

const siteRoot = path.resolve(__dirname, "..");

function pageUrl(file) {
  return `file:///${path.join(siteRoot, file).replace(/\\/g, "/")}`;
}

test("home page toggles theme and language", async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem("portfolio-language", "ko");
    localStorage.setItem("portfolio-theme", "light");
  });
  await page.goto(pageUrl("index.html"));
  await expect(page.getByRole("heading", { name: "현장 문제를 데이터와 소프트웨어로 풀어내는 엔지니어" })).toBeVisible();

  const initialTheme = await page.locator("html").evaluate((el) => el.classList.contains("dark"));
  await page.getByRole("button", { name: "Theme toggle" }).click();
  await expect
    .poll(() => page.locator("html").evaluate((el) => el.classList.contains("dark")))
    .toBe(!initialTheme);

  await page.getByRole("button", { name: "Language toggle" }).click();
  await expect(page.getByRole("heading", { name: "An engineer turning field problems into data-driven software" })).toBeVisible();
});

test("profile page shows framed profile photo", async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem("portfolio-language", "ko");
    localStorage.setItem("portfolio-theme", "light");
  });
  await page.goto(pageUrl("profile.html"));
  await expect(page.getByRole("heading", { name: "신현학" })).toBeVisible();
  await expect(page.getByText("대한민국, 여수시")).toBeVisible();
  await expect(page.getByAltText("Hyeonhak Shin profile photo")).toBeVisible();
  await page.getByRole("button", { name: "Language toggle" }).click();
  await expect(page.getByText("Yeosu, Republic of Korea")).toBeVisible();
});

test("project page renders static project cards", async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem("portfolio-language", "ko");
    localStorage.setItem("portfolio-theme", "light");
  });
  await page.goto(pageUrl("projects.html"));
  await expect(page.getByRole("heading", { name: "프로젝트", exact: true })).toBeVisible();
  await expect(page.locator(".project-card")).toHaveCount(10);
  await expect(page.getByText("2023 대학생 창작모빌리티 경진대회 무인모빌리티")).toBeVisible();
  await expect(page.getByText("무인 경비 로봇 관제 시스템 ROBOCOP")).toBeVisible();
  await expect(page.getByText("재난지역탐사로봇 GAEMI")).toBeVisible();
  await expect(page.getByRole("button", { name: "GM" })).toHaveCount(0);
});

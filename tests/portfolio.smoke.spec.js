const { test, expect } = require("@playwright/test");

test("home page toggles theme and language", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "센서 데이터에서 주행 제어까지, 움직이는 로봇을 만듭니다." })).toBeVisible();
  await expect(page.getByText("자율주행자동차 연구회")).toBeVisible();
  await expect(page.getByText("POSCO DX P/C 엔지니어")).toBeVisible();
  await expect(page.getByText("로봇/자율주행 프로젝트")).toBeVisible();
  await expect(page.getByRole("heading", { name: "대표 작업" })).toBeVisible();
  await expect(page.getByRole("button", { name: "대표 작업 살펴보기" })).toBeVisible();
  await expect(page.getByRole("button", { name: "이력 한눈에 보기" })).toBeVisible();
  await expect(page.getByText("Autonomy Pipeline")).toHaveCount(0);
  await expect(page.locator(".career-card")).toHaveCSS("background-color", "rgb(248, 250, 252)");
  await expect(page.locator(".primary-btn")).toHaveCSS("background-color", "rgb(17, 24, 39)");
  await page.getByRole("button", { name: "Language toggle" }).click();
  await expect(page.getByRole("heading", { name: "Building robot software from sensor data to motion control." })).toBeVisible();
  await expect(page.getByText("Autonomous Vehicle Research Group")).toBeVisible();
  await expect(page.getByRole("button", { name: "Explore Selected Work" })).toBeVisible();

  const initialTheme = await page.locator("html").evaluate((el) => el.classList.contains("dark"));
  await page.getByRole("button", { name: "Theme toggle" }).click();
  await expect
    .poll(() => page.locator("html").evaluate((el) => el.classList.contains("dark")))
    .toBe(!initialTheme);
});

test("profile page shows framed profile photo", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "프로필", exact: true }).click();
  await expect(page.getByRole("heading", { name: "신현학", exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { name: "연락처" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "경력" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "학력" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "교육 및 활동" })).toBeVisible();
  await expect(page.getByText("대한민국, 여수시")).toBeVisible();
  await expect(page.locator(".info-card", { hasText: "학력" })).toContainText("한국기술교육대학교");
  await expect(page.locator(".info-card", { hasText: "학력" })).not.toContainText("삼성청년SW아카데미");
  await expect(page.locator(".info-card", { hasText: "교육 및 활동" })).toContainText("삼성청년SW아카데미");
  await expect(page.getByText("SSAFY 삼성전자 DA사업부 연계 프로젝트 우수상 | 3등")).toBeVisible();
  await expect(page.getByRole("link", { name: "imur.navigator@gmail.com" })).toHaveAttribute("href", "mailto:imur.navigator@gmail.com");
  await expect(page.getByRole("link", { name: /github\.com\/Carpediem324/ })).toHaveAttribute("href", "https://github.com/Carpediem324");
  await expect(page.getByAltText("Hyeonhak Shin profile photo")).toBeVisible();
});

test("project page renders static project cards", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "프로젝트", exact: true }).click();
  await expect(page.getByRole("heading", { name: "프로젝트", exact: true })).toBeVisible();
  await expect(page.locator(".project-card")).toHaveCount(10);
  await expect(page.getByRole("heading", { name: "2023 대학생 창작모빌리티 경진대회 무인모빌리티" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "무인 경비 로봇 관제 시스템 ROBOCOP" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "재난지역탐사로봇 GAEMI" })).toBeVisible();
  await expect(page.getByText("SSAFY 삼성전자 DA사업부 연계 프로젝트 우수상 | 3등")).toBeVisible();

  const loadedImages = await page.locator(".project-media img").evaluateAll((images) =>
    images.map((image) => ({ src: image.getAttribute("src"), width: image.naturalWidth })),
  );
  expect(loadedImages.every((image) => image.width > 0)).toBeTruthy();

  const mediaHeights = await page.locator(".project-card .project-media").evaluateAll((media) =>
    media.map((item) => Math.round(item.getBoundingClientRect().height)),
  );
  expect(new Set(mediaHeights).size).toBe(1);
});

const { chromium } = require("playwright");
const { expect } = require("@playwright/test");

(async () => {
  const browser = await chromium.launch({
    headless: false,
  });
  // Set up page
  const page = await browser.newPage();
  page.goto("http://localhost:3000");

  // move 1
  await expect(
    page.locator("div:nth-of-type(16) button:nth-of-type(16)")
  ).toHaveClass("Space N");
  await page.click("div:nth-of-type(16) button:nth-of-type(16)");
  await expect(
    page.locator("div:nth-of-type(16) button:nth-of-type(16)")
  ).toHaveClass("Space B");

  // move 2
  await expect(
    page.locator("div:nth-of-type(4) button:nth-of-type(4)")
  ).toHaveClass("Space N");
  await page.click("div:nth-of-type(4) button:nth-of-type(4)");
  await expect(
    page.locator("div:nth-of-type(4) button:nth-of-type(4)")
  ).toHaveClass("Space W");

  // move 3
  await expect(
    page.locator("div:nth-of-type(16) button:nth-of-type(4)")
  ).toHaveClass("Space N");
  await page.click("div:nth-of-type(16) button:nth-of-type(4)");
  await expect(
    page.locator("div:nth-of-type(16) button:nth-of-type(4)")
  ).toHaveClass("Space B");

  // move 4
  await expect(
    page.locator("div:nth-of-type(4) button:nth-of-type(16)")
  ).toHaveClass("Space N");
  await page.click("div:nth-of-type(4) button:nth-of-type(16)");
  await expect(
    page.locator("div:nth-of-type(4) button:nth-of-type(16)")
  ).toHaveClass("Space W");

  // close context and video
  browser.close();
})();

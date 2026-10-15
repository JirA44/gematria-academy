const { test, expect } = require("@playwright/test");
const routeMap = require("../fixtures/production-routes.json");

test("representative production routes return visible HTML", async ({ page }) => {
  for (const route of routeMap.browser_sample) {
    const response = await page.goto("/" + route, { waitUntil: "domcontentloaded" });
    expect(response, route + " should return a response").not.toBeNull();
    expect(response.status(), route + " should load successfully").toBe(200);
    await expect(page.locator("body"), route + " should render a body").toBeVisible();
  }
});

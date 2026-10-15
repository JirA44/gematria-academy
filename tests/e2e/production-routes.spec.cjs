const { test, expect } = require("@playwright/test");
const routeMap = require("../fixtures/production-routes.json");

for (const route of routeMap.browser_sample) {
  test(route + " returns visible HTML", async ({ page }) => {
    const response = await page.goto("/" + route, { waitUntil: "domcontentloaded" });
    expect(response, route + " should return a response").not.toBeNull();
    expect(response.status(), route + " should load successfully").toBe(200);
    await expect(page.locator("body"), route + " should render a body").toBeVisible();
  });
}

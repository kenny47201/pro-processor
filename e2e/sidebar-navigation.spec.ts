import { test, expect } from "@playwright/test";

/**
 * E2E smoke test: clicks every sidebar link and verifies the target
 * page loads without a 404 (i.e. the NotFound page is NOT rendered).
 *
 * Prerequisites:
 *   1. `npx playwright install` (one-time browser download)
 *   2. App running on localhost:8080, or let playwright.config start it
 *   3. A logged-in session — if auth redirects block navigation,
 *      add a beforeEach that logs in via the UI or sets a cookie.
 */

// Every sidebar link that should be reachable.
// Keep this in sync with AppSidebar.tsx.
const sidebarLinks = [
  { label: "Knowledge Hub", path: "/knowledge" },
  { label: "Documents", path: "/knowledge/docs" },
  { label: "Defect Guides", path: "/knowledge/defects" },
  { label: "Fix Records", path: "/knowledge/fixes" },
  { label: "Process Tools", path: "/process-tools" },
  { label: "Shift Tasks", path: "/shift-tasks" },
  { label: "Conversations", path: "/conversations" },
  { label: "Issues", path: "/issues" },
  { label: "Users", path: "/users" },
  { label: "Settings", path: "/settings" },
  { label: "Tenants", path: "/tenants" },
];

for (const link of sidebarLinks) {
  test(`Sidebar → "${link.label}" (${link.path}) loads without 404`, async ({
    page,
  }) => {
    // Navigate directly to the path (avoids needing to expand sidebar groups)
    const response = await page.goto(link.path, { waitUntil: "networkidle" });

    // The server should return 200 (SPA fallback serves index.html)
    expect(response?.status()).toBe(200);

    // The React app should NOT render the NotFound page
    const notFoundHeading = page.locator("text=404");
    const isVisible = await notFoundHeading.isVisible().catch(() => false);
    expect(isVisible).toBe(false);

    // The page should have meaningful content (not a blank white screen)
    const body = await page.locator("body").innerText();
    expect(body.length).toBeGreaterThan(10);
  });
}

test("No Defect AI link exists in sidebar", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  const defectAiLink = page.locator('a:has-text("Defect AI")');
  await expect(defectAiLink).toHaveCount(0);
});

test("Knowledge hub cards link to valid routes", async ({ page }) => {
  await page.goto("/knowledge", { waitUntil: "networkidle" });

  const cards = page.locator('a[href^="/knowledge/"]');
  const hrefs: string[] = [];
  for (let i = 0; i < (await cards.count()); i++) {
    const href = await cards.nth(i).getAttribute("href");
    if (href) hrefs.push(href);
  }

  expect(hrefs.length).toBeGreaterThan(0);

  for (const href of hrefs) {
    const res = await page.goto(href, { waitUntil: "networkidle" });
    expect(res?.status()).toBe(200);

    const notFound = await page.locator("text=404").isVisible().catch(() => false);
    expect(notFound).toBe(false);
  }
});

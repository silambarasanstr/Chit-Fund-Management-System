import { test, expect } from "@playwright/test";

test("Member login and Member dashboard loads", async ({ page }) => {
  // Login
  await page.goto("/login");

  await page.fill('input[name="email"]', "member@example.com");
  await page.fill('input[name="password"]', "123456");

  await page.click("button[type='submit']");

  // Verify navigation
  await expect(page).toHaveURL(/admin/);

  // Verify dashboard heading
  await expect(page.getByRole("heading", { name: /dashboard/i })).toBeVisible();
});

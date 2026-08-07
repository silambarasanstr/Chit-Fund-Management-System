# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: member\login.spec.js >> Member login and Member dashboard loads
- Location: tests\member\login.spec.js:3:1

# Error details

```
Error: expect(page).toHaveURL(expected) failed

Expected pattern: /admin/
Received string:  "http://localhost:8081/login"
Timeout: 5000ms

Call log:
  - Expect "toHaveURL" with timeout 5000ms
    13 × locator resolved to <html lang="en">…</html>
       - unexpected value "http://localhost:8081/login"

```

```yaml
- text: 💰
- heading "Chit Fund Management" [level=1]
- paragraph: Login to your account
- text: Email
- textbox "Email":
  - /placeholder: Enter email
  - text: member@example.com
- text: Password
- textbox "Password":
  - /placeholder: Enter password
  - text: "123456"
- text: Invalid email or password
- button "Sign In"
- paragraph: Quick Login
- text: Click to autofill
- button "👨‍💼 Admin admin@example.com USE":
  - paragraph: 👨‍💼 Admin
  - paragraph: admin@example.com
  - text: USE
- button "👤 Member member@example.com USE":
  - paragraph: 👤 Member
  - paragraph: member@example.com
  - text: USE
- paragraph: © 2026 Chit Fund Management System
- region "Notifications alt+T"
```

# Test source

```ts
  1  | import { test, expect } from "@playwright/test";
  2  | 
  3  | test("Member login and Member dashboard loads", async ({ page }) => {
  4  |   // Login
  5  |   await page.goto("/login");
  6  | 
  7  |   await page.fill('input[name="email"]', "member@example.com");
  8  |   await page.fill('input[name="password"]', "123456");
  9  | 
  10 |   await page.click("button[type='submit']");
  11 | 
  12 |   // Verify navigation
> 13 |   await expect(page).toHaveURL(/admin/); 
     |                      ^ Error: expect(page).toHaveURL(expected) failed
  14 | 
  15 |   // Verify dashboard heading
  16 |   await expect(
  17 |     page.getByRole("heading", { name: /dashboard/i })
  18 |   ).toBeVisible();
  19 | });
```
import { test, expect } from "@playwright/test";

test("user can create a new employee", async ({ page }) => {
  // Open Add Employee page
  await page.goto("http://localhost:5173/employees/add");

  // Verify Add Employee page
  await expect(
    page.getByRole("main").getByRole("heading", { name: "Add Employee" }),
  ).toBeVisible();

  // Fill employee form
  await page.getByLabel("Full Name").fill("Playwright Test User");

  await page.getByLabel("Email").fill("playwright.test@example.com");

  await page.getByLabel("Phone").fill("+92 300 1234567");

  await page.getByLabel("Department").selectOption("IT");

  await page.getByLabel("Position").fill("Software Engineer");

  await page.getByLabel("Salary").fill("100000");

  await page.getByLabel("Joining Date").fill("2026-08-26");

  await page.getByLabel("Status").selectOption("Active");

  // Submit form
  await page.getByRole("button", { name: "Save Employee" }).click();

  // Verify navigation to Employees page
  await expect(page).toHaveURL(/\/employees/);
});

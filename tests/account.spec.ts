import { test, expect } from '@playwright/test';
import { beforeEach } from 'node:test';

test.beforeEach(async ({ page }) => {
  // open url
  await page.goto('/my-account');
});

test.afterEach(async ({ page }) => {
  // close page after each test
  await page.close();
  await page.context().close();
});

test.describe('My Account', () => {

    /*test('Login', async ({page}) => {
        await page.locator('#username').fill('practiceuser1');
        await page.locator('#password').fill('PracticePass1!');
        await page.locator('[value="Log in"]').click();

        await expect(page.locator("//a[text()='Log out']")).toBeVisible();
    });*/

    test('Access Orders', async ({page}) => {
        await page.locator(`li a[href*='orders']`).click();
        await expect(page).toHaveURL(/.*orders/);
    });

    test('Access Downloads', async ({page})=> {
        await page.locator(`li a[href*='downloads']`).click();
        await expect(page).toHaveURL(/.*downloads/);
    });
});
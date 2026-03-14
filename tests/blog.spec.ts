import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  // open url
  await page.goto("https://practice.sdetunicorns.com/blog/");
});

test.afterEach(async ({ page }) => {
  // close page after each test
  await page.close();
  await page.context().close();
});

test.describe("Blog", () => {
  test("Verify Recent Posts count and verify the length of each list item", async ({ page }) => {
    // get the recent post list elements
    const recentPostList = page.locator("#recent-posts-3 ul li");

    //loop through the list and assert the char length > 10
    for (const element of await recentPostList.elementHandles()) {
      expect(
        ((await element.textContent())?.trim())?.length,
        `Recent Post ${await element.innerText()} lenght is not grather than 10 characters`,
      ).toBeGreaterThan(10);
    }

    //assert the total length = 5
    expect(await recentPostList.count()).toEqual(5);
  });
});
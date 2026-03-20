import { expect, test } from "@playwright/test";
import BlogPage from "../pages/blog.page.ts";

test.beforeEach(async ({ page }) => {
  const blogPage = new BlogPage(page);
  // open url
  await blogPage.navigateTo("blog/");
});

test.afterEach(async ({ page }) => {
  // close page after each test
  await page.close();
  await page.context().close();
});

test.describe("Blog", () => {
  let blogPage: BlogPage;
  test("Verify Recent Posts count and verify the length of each list item", async ({ page }) => {
    blogPage = new BlogPage(page);
    // get the recent post list elements
    const recentPostList = blogPage.recentPostList;

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
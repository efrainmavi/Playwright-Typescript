import { expect, test } from "@playwright/test";
import * as path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

test.beforeEach(async ({ page }) => {
  // open url
  await page.goto("https://practice.sdetunicorns.com/cart/");
});

test.afterEach(async ({ page }) => {
  // close page after each test
  await page.close();
  await page.context().close();
});

test.describe("Upload File", () => {
  test("should upload a test file", async ({ page }) => {
    //provide test file path
    const filePath = path.join(__dirname, "../data/test-img.png");

    // upload test file
    await page.setInputFiles("input#upfile_1", filePath);

    //click the submit button
    await page.locator("#upload_1").click();

    //assertion
    await expect(
      page.locator("div#wfu_messageblock_header_1_1"),
      `Success Message was not found or it not contain expected text`,
    ).toContainText("uploaded successfully");
  });

  test("Upload file using hidden element", async ({ page }) => {
    //provide test file path
    const filePath = path.join(__dirname, "../data/Listado_GANA_AUTO_V5.pdf");

    //DOM manipulation
    await page.evaluate(() => {
      const selector = document.querySelector("input#upfile_1");
      if (selector) {
        selector.className = "";
      }
    });

    // upload test file
    await page.setInputFiles("input#upfile_1", filePath);

    //click the submit button
    const submitButton = page.locator("#upload_1");
    await submitButton.click();
 
    //Harcoded sleep - wrong way
    //wait page.waitForTimeout(5000);

    //Conditinal wait
    //await page.locator("div#wfu_messageblock_header_1_1").waitFor({state: 'visible', timeout: 10000});

    //Assertion wait
    //await expect( page.locator("#wfu_messageblock_header_1_1")).toContainText('uploaded successfully', {timeout: 10000});

    //assertion
    await expect(
      page.locator("#wfu_messageblock_header_1_1"),
      `Success Message was not found or it not contain expected text`,
    ).toContainText("uploaded successfully");
  });


});

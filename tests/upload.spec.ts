import { expect, test } from "@playwright/test";
import * as path from "path";
import { fileURLToPath } from "url";
import CartPage from "../pages/cart.page.ts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

test.beforeEach(async ({ page }) => {
  // open url
  await page.goto("/cart/");
});

test.afterEach(async ({ page }) => {
  // close page after each test
  await page.close();
  await page.context().close();
});

test.describe("Upload File", () => {
  let cartPage: CartPage;
  const fileName = ["test-img.png", "Listado_GANA_AUTO_V5.pdf"];

  for (const name of fileName) {
    test(`should upload a ${name} file`, async ({ page }) => {
      cartPage = new CartPage(page);
      //provide test file path
      const filePath = path.join(__dirname, `../data/${name}`);

      // upload test file
      //await page.setInputFiles("input#upfile_1", filePath);
      await cartPage.UploadComponent().uploadFile(filePath);

      //click the submit button
      //await page.locator("#upload_1").click();

      //assertion
      await expect(
        cartPage.UploadComponent().successMessage,
        `Success Message was not found or it not contain expected text`,
      ).toContainText("uploaded successfully");
    });
  }

  test.skip("Upload file using hidden element", async ({ page }) => {
    cartPage = new CartPage(page);
    //provide test file path
    const filePath = path.join(__dirname, "../data/Listado_GANA_AUTO_V5.pdf");

    // upload test file
    //await page.setInputFiles("input#upfile_1", filePath);
    await cartPage.UploadComponent().uploadFile(filePath);

    //click the submit button
    //    const submitButton = page.locator("#upload_1");
    //    await submitButton.click();

    //Harcoded sleep - wrong way
    //wait page.waitForTimeout(5000);

    //Conditinal wait
    //await page.locator("div#wfu_messageblock_header_1_1").waitFor({state: 'visible', timeout: 10000});

    //Assertion wait
    //await expect( page.locator("#wfu_messageblock_header_1_1")).toContainText('uploaded successfully', {timeout: 10000});

    //assertion
    await expect(
      cartPage.UploadComponent().successMessage,
      `Success Message was not found or it not contain expected text`,
    ).toContainText("uploaded successfully");
  });
});

import {test, expect} from '@playwright/test';

test.beforeEach(async ({page}) => {
    // open url
    await page.goto('https://practice.sdetunicorns.com/contact/');
});

test.afterEach(async ({page}) => {
    // close page after each test
    await page.close();
    await page.context().close();
});

test.describe('Contact', async () => {
    test('Fill contact formi and verify success message', async ({page}) => {
        // fill the form
        await page.locator("//div[contains(@class, 'contact-message')]//textarea").fill('This is a test message');

        //clcik submit button
        const submitButton = page.getByRole('button', {name: 'Submit'});
        await submitButton.click();

        // verify success message

    });

});
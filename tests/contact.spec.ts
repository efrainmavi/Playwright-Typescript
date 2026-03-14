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
        await page.locator('.contact-name input').fill('John Doe');
        await page.locator('.contact-email input').fill('test@mail.com');
        await page.locator('.contact-phone input').fill('134567864');
        await page.locator('.contact-message textarea').fill('This is a test message');

        //clcik submit button
        const submitButton = page.getByRole('button', {name: 'Submit'});
        await submitButton.click();

        // verify success message

        const successAlert =  page.locator('.everest-forms-notice');
        expect(await successAlert.textContent()).toContain('Thanks for contacting us! We will be in touch with you shortly');
    });

});
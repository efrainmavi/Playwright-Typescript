import {test, expect} from '@playwright/test';
import ContactPage from '../pages/contact.page.ts';

test.beforeEach(async ({page}) => {
    const contactPage = new ContactPage(page);
    // open url
    await contactPage.navigateTo('https://practice.sdetunicorns.com/contact/');
});

test.afterEach(async ({page}) => {
    // close page after each test
    await page.close();
    await page.context().close();
});

test.describe('Contact', async () => {
    let contactPage: ContactPage;

    test('Fill contact formi and verify success message', async ({page}) => {
        contactPage = new ContactPage(page);
        // fill the form
        await contactPage.enterName('John Doe');
        await contactPage.enterEmail('test@mail.com');
        await contactPage.enterPhone('134567864');
        await contactPage.enterMessage('This is a test message');

        //clcik submit button
        const submitButton = contactPage.submitBtn;
        await submitButton.click();

        // verify success message

        const successAlert =  contactPage.successAlert;
        expect(await successAlert.textContent()).toContain('Thanks for contacting us! We will be in touch with you shortly');
    });

});
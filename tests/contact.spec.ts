import {test, expect} from '@playwright/test';
import ContactPage from '../pages/contact.page.ts';
import { faker } from '@faker-js/faker';

test.beforeEach(async ({page}) => {
    const contactPage = new ContactPage(page);
    // open url
    await contactPage.navigateTo('/contact/');
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
        await contactPage.submitForm(faker.person.firstName(),faker.internet.email(),faker.phone.number(),faker.lorem.paragraph(2));

        // verify success message
        const successAlert =  contactPage.successAlert;
        expect(await successAlert.textContent()).toContain('Thanks for contacting us! We will be in touch with you shortly');
    });

});
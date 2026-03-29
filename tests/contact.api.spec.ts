import {test, expect, APIRequestContext, APIResponse} from '@playwright/test';
import ContactPage from '../pages/contact.page.ts';
import { faker } from '@faker-js/faker';
import Person from '../utils/response.types.ts';


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

test.describe ('Contact', async () => {
    let contactPage: ContactPage;
    let fakerApi: APIRequestContext;
    let person: Person;

    test.beforeAll(async ({playwright}) => {
        fakerApi = await playwright.request.newContext({
            baseURL: 'https://jsonplaceholder.typicode.com'
        });

        const response = await fakerApi.get('/users');
        const responseBody = await response.json();
        person = responseBody[0];

        const postResponse = await fakerApi.post('/users/1/todos', {
            data: {
                title: 'test todo learn playwright',
                completed: false
            }
        });

        const postResBody = await postResponse.json();
        console.log(postResBody);
    });

    test('Fill contact form and verify success message', async ({page}) => {
        contactPage = new ContactPage(page);
        // fill the form
        //using faker
        //await contactPage.submitForm(faker.person.firstName(),faker.internet.email(),faker.phone.number(),faker.lorem.paragraph(2));

        //using test data from a request
        await contactPage.submitForm(
            person.name,
            person.email,
            person.phone,
            person.website);

        // verify success message
        const successAlert =  contactPage.successAlert;
        expect(await successAlert.textContent()).toContain('Thanks for contacting us! We will be in touch with you shortly');
    });

});
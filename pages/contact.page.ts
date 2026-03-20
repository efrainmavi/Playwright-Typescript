import {Page, Locator } from '@playwright/test';

export default class ContactPage {
    page: Page;

    nameInput: Locator;
    emailInput: Locator;
    phoneInput: Locator;
    messageInput: Locator;
    submitBtn: Locator;
    successAlert: Locator;

    constructor(page: Page){
        this.page = page;
        this.nameInput = page.locator('.contact-name input');
        this.emailInput = page.locator('.contact-email input');
        this.phoneInput = page.locator('.contact-phone input');
        this.messageInput = page.locator('.contact-message textarea');
        this.submitBtn = page.getByRole('button', {name: 'Submit'});
        this.successAlert = page.locator('.everest-forms-notice');
    }

    async navigateTo(url: string){
        await this.page.goto(url);
    }

    async submitForm(name: string, email: string, phone: string, message: string){
        await this.nameInput.fill(name);
        await this.emailInput.fill(email);
        await this.phoneInput.fill(phone);
        await this.messageInput.fill(message);
        await this.submitBtn.click();
    }
}
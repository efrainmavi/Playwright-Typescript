import {Page, Locator} from '@playwright/test';

export default class HomePage {
    page: Page;
    getStartedButton: Locator;
    headingText: Locator;
    homeText: Locator;
    searchIcon: Locator;
    navLinks: Locator;

    constructor(page: Page){
        this.page = page;
        this.getStartedButton = page.locator('#get-started');
        this.headingText = page.locator("text=Think different. Make different");
        this.homeText = page.locator("#zak-primary-menu >> text=Home");
        this.searchIcon = page.locator("//div[contains(@class, 'zak-header-actions--desktop')]//a[contains(@class, 'zak-header-search__toggle')]");
        this.navLinks = page.locator("#zak-primary-menu li[id*=menu-item]");
    }

    async navigateTo(url: string){
        await this.page.goto(url);
    }

    getNavLinksText(){
        return this.navLinks.allTextContents();
    }
    
}
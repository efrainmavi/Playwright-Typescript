import {Page, Locator} from '@playwright/test';

export default class BlogPage {
    page: Page;
    recentPostList: Locator;

    constructor(page: Page){
        this.page = page;
        this.recentPostList = page.locator("#recent-posts-3 ul li");

    }

    async navigateTo(url: string){
        await this.page.goto(url);
    }

}
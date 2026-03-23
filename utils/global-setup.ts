import { chromium, FullConfig, expect } from '@playwright/test';
export default async function globalSetup(config: FullConfig){
    const browser = await chromium.launch();
    const page = await browser.newPage();
    console.log("########## Global SetUp ##########");
    await page.goto('https://practice.sdetunicorns.com/my-account');
    await page.context().storageState({ path: 'notLoggedInState.json' });

    //login
    await page.locator('#username').fill('practiceuser1');
    await page.locator('#password').fill('PracticePass1!');
    await page.locator('[value="Log in"]').click();

    //save signed-in state to 'loggedInState.json'
    await page.context().storageState({ path: 'loggedInState.json' });
    await browser.close();
}
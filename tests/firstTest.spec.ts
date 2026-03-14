import {test, expect} from '@playwright/test';

test.beforeEach(async ({page}) => {
    // open url
    await page.goto('https://practice.sdetunicorns.com/');
});

test.afterEach(async ({page}) => {
    // close page after each test
    await page.close();
    await page.context().close();
});

test.describe('Home', async () => {
    test('Open Home Page and verify title', async ({page}) => {

        // verify title
        await expect(page).toHaveTitle('Practiceww E-Commerce Site – SDET Unicorns');
    });

    test('Open About Page and Verify title', async ({page}) => {
        //await page.getByRole('navigation', {name: 'Breadcrumbs'}).isVisible();
        
        // verify title
         await expect(page).toHaveTitle('Practice E-Commerce Site – SDET Unicorns');
    });

    test('Click "GET STARTED" button using css selector', async ({page}) => {
        // click the button
        await page.locator('#get-started').click();

        //verify url has #get-started
        expect(page.url()).toContain('#get-started');
    });

    test('Verify heading text is visible using text selector', async ({page}) => {
        // click the button
        const headingText = await page.locator("text=Think different. Make different");

        // verify heading text is visible
        await expect(headingText).toBeVisible();
    });

    test('Verify home link is enable using text and css selector', async ({page}) => {
        // click the button
        const homeText = await page.locator("#zak-primary-menu >> text=Home");
        // verify heading text is visible
        await expect(homeText).toBeVisible();
    });

    test('Verify search Icon is visible using xpath selector', async ({page}) => {
        // click the button
        const searchIcon = page.locator("//div[contains(@class, 'zak-header-actions--desktop')]//a[contains(@class, 'zak-header-search__toggle')]");
        // verify heading text is visible
        await expect(searchIcon).toBeVisible();
    });

    test('Verify text of all nav link', async ({page}) => {

        const expectedNavLinks = ['Home', 'About', 'Shop', 'Blog', 'Contact', 'My account'];

        // click the button
        const navLinks = page.locator("#zak-primary-menu li[id*=menu-item]");

        // verify heading text is visible
        expect(await navLinks.allTextContents()).toEqual(expectedNavLinks);
    });

});
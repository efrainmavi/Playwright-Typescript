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
        await expect(page).toHaveTitle('Practice E-Commerce Site – SDET Unicorns');
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


});
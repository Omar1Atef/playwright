import { test, expect } from '@playwright/test';

let storedContext;

test.beforeAll(async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator('#userEmail').fill("omaratef@gmail.com");
    await page.locator('#userPassword').fill("Omar@2000");
    await page.locator('#login').click();
    await page.locator('.card-body b').first().waitFor();

    await context.storageState({ path: 'storageState.json' });
    storedContext = await browser.newContext({ storageState: 'storageState.json' });

});

test('TC 1', async () => {
    const page = await storedContext.newPage();

    await page.goto("https://rahulshettyacademy.com/client");
    await page.getByRole('button', { name: '  ORDERS' }).click();
    await expect(page.getByText('Your Orders')).toBeVisible();
    await page.locator('tbody tr').filter({ hasText: "69b88b9ef86ba51a650a85c4" }).getByRole('button', { name: 'View' }).click();
    await expect(page.getByText('Thank you for Shopping With Us')).toBeVisible();
});

test('TC 2', async () => {
    const page = await storedContext.newPage();

    await page.goto("https://rahulshettyacademy.com/client");
    await page.getByRole('button', { name: '  ORDERS' }).click();
    await expect(page.getByText('Your Orders')).toBeVisible();
});


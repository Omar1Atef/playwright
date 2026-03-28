import { test, expect } from '@playwright/test';

test('dynamically find specific product from list of products', async ({ page }) => {
    const products = page.locator('.card-body');

    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator('#userEmail').fill("omaratef@gmail.com");
    await page.locator('#userPassword').fill("Omar@2000");
    await page.locator('#login').click();

    await page.locator('.card-body b').first().waitFor();

    //count() has no auto-wait — it returns 0 immediately if products haven't loaded yet.

    for (let i = 0; i < await products.count(); i++) {
        if (await products.nth(i).locator('b').textContent() === "ADIDAS ORIGINAL") {
            await products.nth(i).locator('text= Add To Cart').click();
            break;
        }
    }

    // Instead of the loop — Playwright filter
    // await page.locator('.card').filter({ hasText: 'ADIDAS ORIGINAL' })
    //           .locator('text=Add To Cart')
    //           .click();

    await page.locator('[routerlink*="cart"]').click();
    // const bool = await page.locator('h3:has-text("ADIDAS ORIGINAL")').isVisible();
    // expect(bool).toBeTruthy();

    await expect(page.locator('h3:has-text("ADIDAS ORIGINAL")')).toBeVisible();

    await page.locator('text=Checkout').click();

    await page.locator('[placeholder="Select Country"]').pressSequentially('ind');
    const dropdown = page.locator('.ta-results');
    await dropdown.waitFor();
    const optionsCount = await dropdown.locator('button').count();

    for (let i = 0; i < optionsCount; i++) {
        const text = await dropdown.locator('button').nth(i).textContent();
        // if (text === " India") {
        if (text.trim() === "India") {
            await dropdown.locator('button').nth(i).click();
            break;
        }
    }

    await expect(page.locator('label[type="text"]')).toHaveText('omaratef@gmail.com');
    await page.locator('.action__submit').click();

    await expect(page.locator('.hero-primary')).toHaveText(' Thankyou for the order. ');
    const orderID = await page.locator('label[class="ng-star-inserted"]').textContent();
    console.log("orderID of your order: " + orderID);

    await page.locator('li [routerlink="/dashboard/myorders"]').click();
    await expect(page.locator('h1[class="ng-star-inserted"]')).toHaveText('Your Orders');


    for (let i = 0; i < await page.locator('tbody tr').count(); i++) {
        const rowOrderID = await page.locator('tbody tr').nth(i).locator('th').textContent();
        if (orderID.includes(rowOrderID)) {
            await page.locator('tbody tr').nth(i).locator('td').locator('.btn-primary').click();
            break;
        }
    }
    await expect(page.locator('.tagline')).toHaveText('Thank you for Shopping With Us');
}
);
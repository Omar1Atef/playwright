import { test, expect } from '@playwright/test';
import ApiUtils from '../../utils/ApiUtils.js';

let token;
let orderID;

const orderPayload = { orders: [{ country: "Egypt", productOrderedId: "6960eae1c941646b7a8b3ed3" }] };

const loginPayload = { userEmail: "omaratef@gmail.com", userPassword: "Omar@2000" };

test.beforeAll(async ({ request }) => {
    const apiUtils = new ApiUtils(request, loginPayload);
    token = await apiUtils.getToken();
    orderID = await apiUtils.createOrder(orderPayload);

});

test('E2E TC using WebAPI', async ({ page }) => {

    await page.addInitScript((tokenValue) => {
        localStorage.setItem('token', tokenValue);
    }, token);

    await page.goto("https://rahulshettyacademy.com/client");


    await page.getByRole('button', { name: '  ORDERS' }).click();
    await expect(page.getByText('Your Orders')).toBeVisible();

    await page.locator('tbody tr').filter({ hasText: orderID }).getByRole('button', { name: 'View' }).click();
    await expect(page.getByText('Thank you for Shopping With Us')).toBeVisible();
}
);

import { test, expect } from '@playwright/test';

let token;
let orderID;
test.beforeAll(async ({ request }) => {

    //login API call to get token
    const loginResponse = await request.post("https://rahulshettyacademy.com/api/ecom/auth/login", {
        data: {
            userEmail: "omaratef@gmail.com",
            userPassword: "Omar@2000"
        }
    });
    expect(loginResponse.status()).toBe(200);
    const loginResponseBody = await loginResponse.json();
    console.log(loginResponseBody);
    token = loginResponseBody.token;
    console.log(token);

    //create order API call to create order 
    const orderResponse = await request.post("https://rahulshettyacademy.com/api/ecom/order/create-order", {
        data:
        {
            orders: [{ country: "Egypt", productOrderedId: "6960eae1c941646b7a8b3ed3" }]
        }
        ,
        headers: {
            "Authorization": token,
            "content-type": "application/json"
        }
    });
    // In JavaScript object keys
    // No quotes: when the key is a valid identifier (only letters, digits, _, $; no spaces, no hyphens). (optional )
    // Quotes required: when the key has special characters (e.g. hyphen -, spaces) or you want to use a reserved word. (required)


    expect(orderResponse.status()).toBe(201);
    const orderResponseBody = await orderResponse.json();
    console.log(orderResponseBody);
    console.log("orderID of your order: " + orderResponseBody.orders[0]);
    orderID = orderResponseBody.orders[0];
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
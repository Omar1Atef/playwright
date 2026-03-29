import { test, expect } from '@playwright/test';

const fakePayLoadOrders = { data: [], message: "No Orders" };


test('Fullfil resoponse Test', async ({ page }) => {

  await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
    async route => {
      const response = await route.fetch();
      const body = JSON.stringify(fakePayLoadOrders);
      await route.fulfill(
        {
          response,
          body,
        });
    });

  await page.goto("https://rahulshettyacademy.com/client");
  await page.locator('#userEmail').fill("omaratef@gmail.com");
  await page.locator('#userPassword').fill("Omar@2000");
  await page.locator('#login').click();
  await page.locator('.card-body b').first().waitFor();

  await page.getByRole('button', { name: '  ORDERS' }).click();
  // await page.pause();

  // await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*");
  // console.log(await page.locator(".mt-4").textContent());


  await expect(page.locator(".mt-4")).toContainText("You have No Orders to show at this time.");
});

test('continue request test', async ({ page }) => {

  await page.goto("https://rahulshettyacademy.com/client");
  await page.locator('#userEmail').fill("omaratef@gmail.com");
  await page.locator('#userPassword').fill("Omar@2000");
  await page.locator('#login').click();
  await page.locator('.card-body b').first().waitFor();
  await page.locator("button[routerlink*='myorders']").click();

  page.on('request', request => console.log(request.url()));
  page.on('response', response => console.log(response.url(), response.status()));

  await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
    async route => route.continue({ url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=1' }))
  await page.locator("button:has-text('View')").first().click();
  await expect(page.locator("p").last()).toHaveText("You are not authorize to view this order");

  await page.goto("https://google.com");
  expect(await page.screenshot()).toMatchSnapshot("screenshot.png");
});
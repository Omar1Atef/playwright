import {test,expect} from '@playwright/test';

test('dynamically find specific product from list of products' , async ({ page }) => {
const products = page.locator('.card-body');
await page.goto("https://rahulshettyacademy.com/client");

await page.getByPlaceholder('email@example.com').fill("omaratef@gmail.com");
await page.getByPlaceholder('enter your passsword').fill("Omar@2000");
await page.getByRole('button', { name: 'Login' }).click();

await page.locator('.card-body b').first().waitFor();


// await products.filter({ hasText: 'ADIDAS ORIGINAL' }).locator('text= Add To Cart').click();
await products.filter({ hasText: 'ADIDAS ORIGINAL' }).getByRole('button', { name: 'Add To Cart' }).click();

await page.getByRole('listitem').getByRole('button', { name: 'cart' }).click();

await expect(page.getByText("ADIDAS ORIGINAL")).toBeVisible();

await page.getByRole('button', { name: 'Checkout'}).click();

await page.getByPlaceholder('Select Country').pressSequentially('ind');


await page.getByRole("button",{name :"India"}).nth(1).click(); 

await expect(page.locator('label[type="text"]')).toHaveText('omaratef@gmail.com');
await page.getByText('Place Order ').click();

await expect(page.getByText(' Thankyou for the order. ')).toBeVisible();

const orderID = await page.locator('label[class="ng-star-inserted"]').textContent();
console.log("orderID of your order: " + orderID);

await page.getByRole('button', { name: '  ORDERS' }).click();
await expect(page.getByText('Your Orders')).toBeVisible();

await page.locator('tbody tr').filter({ hasText: "694954ec32ed86587145e502" }).getByRole('button', { name: 'View' }).click();
await expect(page.getByText('Thank you for Shopping With Us')).toBeVisible();
}
);
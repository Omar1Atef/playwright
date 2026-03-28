import { test, expect } from '@playwright/test';
import LoginPage from '../../pageObject/loginPage.js';
import ProductsPage from '../../pageObject/productsPage.js';
import CartPage from '../../pageObject/cartPage.js';
import OrderReviewPage from '../../pageObject/orderReviewPage.js';
import OrderConfirmationPage from '../../pageObject/orderConfirmationPage.js';
import OrdersHistoryPage from '../../pageObject/ordersHistoryPage.js';
import OrderSummaryPage from '../../pageObject/orderSummaryPage.js';

import loginTestData from '../../utils/dataDrivenTestData.json' assert { type: 'json' };

for (const data of loginTestData) {
    test(`E2E e-commerce test - ${data.username}`, async ({ page }) => { //to make each test case unique by adding username to the test name

        await page.goto('https://rahulshettyacademy.com/client');

        const loginPage = new LoginPage(page);
        await loginPage.validLogin(data.username, data.password);

        const productsPage = new ProductsPage(page);
        await productsPage.firstProduct.waitFor();
        await expect(productsPage.homeBtn).toBeVisible();

    });

}
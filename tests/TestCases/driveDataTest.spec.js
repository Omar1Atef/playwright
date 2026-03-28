import { test, expect } from '@playwright/test';
import LoginPage from '../../pageObject/loginPage.js';
import ProductsPage from '../../pageObject/productsPage.js';
import CartPage from '../../pageObject/cartPage.js';
import OrderReviewPage from '../../pageObject/orderReviewPage.js';
import OrderConfirmationPage from '../../pageObject/orderConfirmationPage.js';
import OrdersHistoryPage from '../../pageObject/ordersHistoryPage.js';
import OrderSummaryPage from '../../pageObject/orderSummaryPage.js';

import loginTestData from '../../utils/driveDataTestData.json' assert { type: 'json' };

test('E2E e-commerce test', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/client');

    const loginPage = new LoginPage(page);
    await loginPage.validLogin(loginTestData.username, loginTestData.password);

    const productsPage = new ProductsPage(page);
    await productsPage.firstProduct.waitFor();
    await expect(productsPage.homeBtn).toBeVisible();
    

});

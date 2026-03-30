import { test, expect } from '@playwright/test';
import pageObjectManager_ts from '../../pageObject_ts/pageObjectManager.ts';

test('E2E e-commerce test', async ({ page }) => {

    const poManager = new pageObjectManager_ts(page);

    await page.goto('https://rahulshettyacademy.com/client');

    const loginPage = poManager.getLoginPage();
    await loginPage.validLogin('omaratef@gmail.com', 'Omar@2000');

    const productsPage = poManager.getProductsPage();
    await productsPage.firstProduct.waitFor();

    await productsPage.searchProductToAddToCart('ADIDAS ORIGINAL');
    await productsPage.navigateToCartPage();

    const cartPage = poManager.getCartPage();
    await cartPage.verifyProductInCart('ADIDAS ORIGINAL');
    await cartPage.clickCheckout();

    const orderReviewPage = poManager.getOrderReviewPage();
    await orderReviewPage.selectCountry('India');
    await expect(orderReviewPage.emailLabel).toHaveText('omaratef@gmail.com');
    await orderReviewPage.clickPlaceOrderButton();

    const orderConfirmationPage = poManager.getOrderConfirmationPage();
    await orderConfirmationPage.verifyOrderConfirmationMessage(' Thankyou for the order. ');
    const orderID = await orderConfirmationPage.getOrderID();
    console.log('Order ID:', orderID);

    await productsPage.navigateToOrdersHistoryPage();
    const ordersHistoryPage = poManager.getOrdersHistoryPage();
    await ordersHistoryPage.verifyOrdersHistoryHeader('Your Orders');
    await ordersHistoryPage.searchAndSelectOrder(orderID);

    const orderSummaryPage = poManager.getOrderSummaryPage();
    await orderSummaryPage.verifyOrderConfirmationMessage('Thank you for Shopping With Us');

});

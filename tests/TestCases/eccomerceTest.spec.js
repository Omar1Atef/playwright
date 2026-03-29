import { test, expect } from '@playwright/test';
import LoginPage from '../../pageObject/loginPage.js';
import ProductsPage from '../../pageObject/productsPage.js';
import CartPage from '../../pageObject/cartPage.js';
import OrderReviewPage from '../../pageObject/orderReviewPage.js';
import OrderConfirmationPage from '../../pageObject/orderConfirmationPage.js';
import OrdersHistoryPage from '../../pageObject/ordersHistoryPage.js';
import OrderSummaryPage from '../../pageObject/orderSummaryPage.js';

test('@smoke E2E e-commerce test', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/client');

    const loginPage = new LoginPage(page);
    await loginPage.validLogin('omaratef@gmail.com', 'Omar@2000');

    const productsPage = new ProductsPage(page);
    await productsPage.firstProduct.waitFor();

    await productsPage.searchProductToAddToCart('ADIDAS ORIGINAL');
    await productsPage.navigateToCartPage();

    const cartPage = new CartPage(page);
    await cartPage.verifyProductInCart('ADIDAS ORIGINAL');
    await cartPage.clickCheckout();

    const orderReviewPage = new OrderReviewPage(page);
    await orderReviewPage.selectCountry('India');
    await expect(orderReviewPage.emailLabel).toHaveText('omaratef@gmail.com');
    await orderReviewPage.clickPlaceOrderButton();

    const orderConfirmationPage = new OrderConfirmationPage(page);
    await orderConfirmationPage.verifyOrderConfirmationMessage(' Thankyou for the order. ');
    const orderID = await orderConfirmationPage.getOrderID();
    console.log('Order ID:', orderID);

    await productsPage.navigateToOrdersHistoryPage();
    const ordersHistoryPage = new OrdersHistoryPage(page);
    await ordersHistoryPage.verifyOrdersHistoryHeader('Your Orders');
    await ordersHistoryPage.searchAndSelectOrder(orderID);

    const orderSummaryPage = new OrderSummaryPage(page);
    await orderSummaryPage.verifyOrderConfirmationMessage('Thank you for Shopping With Us');

});

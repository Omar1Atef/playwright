import LoginPage from './loginPage.ts';
import ProductsPage from './productsPage.ts';
import CartPage from './cartPage.ts';
import OrderReviewPage from './orderReviewPage.ts';
import OrderConfirmationPage from './orderConfirmationPage.ts';
import OrdersHistoryPage from './ordersHistoryPage.ts';
import OrderSummaryPage from './orderSummaryPage.ts';
import {type Page } from '@playwright/test';

class PageObjectManager {


    loginPage: LoginPage;
    productsPage: ProductsPage;
    cartPage: CartPage;
    orderReviewPage: OrderReviewPage;
    orderConfirmationPage: OrderConfirmationPage;
    ordersHistoryPage: OrdersHistoryPage;
    orderSummaryPage: OrderSummaryPage;
    page: Page;


    constructor(page: any) {
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.productsPage = new ProductsPage(page);
        this.cartPage = new CartPage(page);
        this.orderReviewPage = new OrderReviewPage(page);
        this.orderConfirmationPage = new OrderConfirmationPage(page);
        this.ordersHistoryPage = new OrdersHistoryPage(page);
        this.orderSummaryPage = new OrderSummaryPage(page);
    }

    getLoginPage() : LoginPage {
        return this.loginPage;
    }
    getProductsPage() : ProductsPage {
        return this.productsPage;
    }
    getCartPage() : CartPage {
        return this.cartPage;
    }
    getOrderReviewPage() : OrderReviewPage {
        return this.orderReviewPage;
    }
    getOrderConfirmationPage() : OrderConfirmationPage {
        return this.orderConfirmationPage;
    }
    getOrdersHistoryPage() : OrdersHistoryPage {
        return this.ordersHistoryPage;
    }
    getOrderSummaryPage() : OrderSummaryPage {
        return this.orderSummaryPage;
    }
}

export default PageObjectManager;
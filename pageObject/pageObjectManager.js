import LoginPage from './loginPage';
import ProductsPage from './productsPage';
import CartPage from './cartPage';
import OrderReviewPage from './orderReviewPage';
import OrderConfirmationPage from './orderConfirmationPage';
import OrdersHistoryPage from './ordersHistoryPage';
import OrderSummaryPage from './orderSummaryPage';

class PageObjectManager {
    constructor(page) {
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.productsPage = new ProductsPage(page);
        this.cartPage = new CartPage(page);
        this.orderReviewPage = new OrderReviewPage(page);
        this.orderConfirmationPage = new OrderConfirmationPage(page);
        this.ordersHistoryPage = new OrdersHistoryPage(page);
        this.orderSummaryPage = new OrderSummaryPage(page);
    }

    getLoginPage() {
        return this.loginPage;
    }
    getProductsPage() {
        return this.productsPage;
    }
    getCartPage() {
        return this.cartPage;
    }
    getOrderReviewPage() {
        return this.orderReviewPage;
    }
    getOrderConfirmationPage() {
        return this.orderConfirmationPage;
    }
    getOrdersHistoryPage() {
        return this.ordersHistoryPage;
    }
    getOrderSummaryPage() {
        return this.orderSummaryPage;
    }
}

export default PageObjectManager;
class ProductsPage {

    constructor(page) {
        this.page = page;
        this.products = page.locator('.card-body');
        this.firstProduct = page.locator('.card-body b').first();
        this.cartBtn = page.locator('[routerlink*="cart"]');
        this.checkoutBtn = page.locator('text=Checkout');
        this.ordersBtn = page.locator('li [routerlink="/dashboard/myorders"]');
        this.homeBtn = page.locator('.btn.btn-custom[routerlink="/dashboard/"]');
    }

    async searchProductToAddToCart(productName) {
        for (let i = 0; i < await this.products.count(); i++) {
            if (await this.products.nth(i).locator('b').textContent() === productName) {
                await this.products.nth(i).locator('text= Add To Cart').click();
                break;
            }
        }
    }

    async navigateToCartPage() {
        await this.cartBtn.click();
    }

    async navigateToOrdersHistoryPage() {
        await this.ordersBtn.click();
    }
}

export default ProductsPage;
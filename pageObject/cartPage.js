import { expect } from '@playwright/test';


class CartPage {

    constructor(page) {
        this.page = page;
        this.checkoutButton = page.locator('text=Checkout');
    }

    async verifyProductInCart(productName) {
        await expect(this.page.locator('h3:has-text("' + productName + '")')).toBeVisible();
    }

    async clickCheckout() {
        await this.checkoutButton.click();
    }

}

export default CartPage;
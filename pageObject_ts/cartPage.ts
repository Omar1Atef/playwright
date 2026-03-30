import { expect, type Locator, type Page } from '@playwright/test';


class CartPage {
        page: Page;
        checkoutButton: Locator;


    constructor(page: Page) {
        this.page = page;
        this.checkoutButton = page.locator('text=Checkout');
    }

    async verifyProductInCart(productName: string) {
        await expect(this.page.locator('h3:has-text("' + productName + '")')).toBeVisible();
    }

    async clickCheckout() {
        await this.checkoutButton.click();
    }

}

export default CartPage;
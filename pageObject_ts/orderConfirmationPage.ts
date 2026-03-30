import { expect, type Locator, type Page } from '@playwright/test';

class OrderConfirmationPage {

    page: Page;
    orderConfirmationMessage: Locator;
    orderIDLabel: Locator;

    constructor(page: Page) {
        this.page = page;
        this.orderConfirmationMessage = page.locator('.hero-primary');
        this.orderIDLabel = page.locator('label[class="ng-star-inserted"]');
    }

    async verifyOrderConfirmationMessage(expectedMessage: string) {
        await expect(this.orderConfirmationMessage).toHaveText(expectedMessage);
    }

    async getOrderID() {
        return await this.orderIDLabel.textContent();
    }

}

export default OrderConfirmationPage;
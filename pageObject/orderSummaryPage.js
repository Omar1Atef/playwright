import { expect } from '@playwright/test';

class OrderSummaryPage {
    constructor(page) {
        this.page = page;
        this.orderConfirmationMessage = page.locator('.tagline');
    }

    async verifyOrderConfirmationMessage(expectedText) {
        await expect(this.orderConfirmationMessage).toHaveText(expectedText);
    }

}

export default OrderSummaryPage;
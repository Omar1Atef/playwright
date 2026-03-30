import { expect, type Locator, type Page } from '@playwright/test';

class OrderSummaryPage {
    page: Page;
    orderConfirmationMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.orderConfirmationMessage = page.locator('.tagline');
    }

    async verifyOrderConfirmationMessage(expectedText: string) {
        await expect(this.orderConfirmationMessage).toHaveText(expectedText);
    }

}

export default OrderSummaryPage;
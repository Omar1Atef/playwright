import { expect } from '@playwright/test';

class OrderConfirmationPage {   
    
    constructor(page) {
        this.page = page;
        this.orderConfirmationMessage = page.locator('.hero-primary');
        this.orderIDLabel = page.locator('label[class="ng-star-inserted"]');
    }

    async verifyOrderConfirmationMessage(expectedMessage) {
        await expect(this.orderConfirmationMessage).toHaveText(expectedMessage);
    }

    async getOrderID() {
        return await this.orderIDLabel.textContent();
    }

}

export default OrderConfirmationPage;
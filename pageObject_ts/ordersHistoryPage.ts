import { expect, type Locator, type Page } from '@playwright/test';

class OrdersHistoryPage {

    page: Page;
    ordersHistoryHeader: Locator;
    rowTable: Locator;
    
    constructor(page: Page) {
        this.page = page;
        this.ordersHistoryHeader = page.locator('h1.ng-star-inserted');
        this.rowTable = page.locator('tbody tr');
    }

    async verifyOrdersHistoryHeader(expectedText: string) {
        await expect(this.ordersHistoryHeader).toHaveText(expectedText);
    }

    async searchAndSelectOrder(orderID: any) {
        const rowCount = await this.rowTable.count();
        for (let i = 0; i < rowCount; i++) {
            const currentOrderID = await this.rowTable.nth(i).locator('th').textContent();
            if (orderID.includes(currentOrderID)) {
                await this.rowTable.nth(i).locator('td').locator('.btn-primary').click();
                break;
            }
        }
    }
}

export default OrdersHistoryPage;
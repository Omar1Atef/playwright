import { type Locator, type Page } from '@playwright/test';

class OrderReviewPage {
    page: Page;
    countryInput: Locator;
    dropdown: Locator;
    emailLabel: Locator;
    placeOrderButton: Locator;
    
    constructor(page: Page) {
        this.page = page;
        this.countryInput = page.locator('[placeholder="Select Country"]');
        this.dropdown = page.locator('.ta-results');
        this.emailLabel = page.locator('label[type="text"]');
        this.placeOrderButton = page.locator('.action__submit');

    }

    async selectCountry(countryName: string) {
        await this.countryInput.pressSequentially(countryName);
        await this.dropdown.waitFor();
        const optionsCount = await this.dropdown.locator('button').count();

        for (let i = 0; i < optionsCount; i++) {
            const text: any = await this.dropdown.locator('button').nth(i).textContent();
            if (text.trim() === countryName) {
                await this.dropdown.locator('button').nth(i).click();
                break;
            }
        }
    }

    async clickPlaceOrderButton() {
        await this.placeOrderButton.click();
    }

}

export default OrderReviewPage;
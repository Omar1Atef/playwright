class OrderReviewPage {
    constructor(page) {
        this.page = page;
        this.countryInput = page.locator('[placeholder="Select Country"]');
        this.dropdown = page.locator('.ta-results');
        this.emailLabel = page.locator('label[type="text"]');
        this.placeOrderButton = page.locator('.action__submit');

    }

    async selectCountry(countryName) {
        await this.countryInput.pressSequentially(countryName);
        await this.dropdown.waitFor();
        const optionsCount = await this.dropdown.locator('button').count();

        for (let i = 0; i < optionsCount; i++) {
            const text = await this.dropdown.locator('button').nth(i).textContent();
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
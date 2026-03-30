import { type Locator, type Page } from '@playwright/test';

class LoginPage {
    page: Page;
    username: Locator;
    password: Locator;
    loginBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.username = page.locator('#userEmail');
        this.password = page.locator('#userPassword');
        this.loginBtn = page.locator('#login');
    }

    async validLogin(username: string, password: string) {
        await this.username.fill(username);
        await this.password.fill(password);
        await this.loginBtn.click();
    }

}

export default LoginPage;
import BasePage from "./basePage.js";

class HomePage extends BasePage {

    get menuButton() {
        return $('button[data-bs-toggle="collapse"]');
    }

    get signInElement() {
        return $('a[data-test="nav-sign-in"]');
    }

    async open() {
        await super.open('/');
    }

    async clickSignIn() {
        if (await this.menuButton.isDisplayed()) {
            await this.menuButton.click();
            await this.signInElement.waitForClickable();
            await this.signInElement.click();
        }
        
        await this.menuButton.click()

        await this.signInElement.waitForClickable();
        await this.signInElement.click();
    }
}

export default new HomePage();
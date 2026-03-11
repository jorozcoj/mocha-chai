import BasePage from "./basePage.js";

class HomePage extends BasePage {

    get menuButton() {
        return $('.navbar-toggler');
    }

    get navbarContent() {
        return $('#navbarSupportedContent')
    }

    get signInElement() {
        return $('a[data-test="nav-sign-in"]');
    }

    get languageButton() {
        return $('#language');
    }

    get spanishOption() {
        return $('[data-test="lang-es"]');
    }

    async open() {
        await super.open('/');
    }

    async clickSignIn() {
        if (await this.menuButton.isDisplayed()) {
            await this.menuButton.click();
        }

        await this.signInElement.scrollIntoView();
        await this.signInElement.waitForDisplayed();
        await this.signInElement.waitForClickable();

        await this.signInElement.click();
    }

    async changeLanguage() {

        if (await this.menuButton.isDisplayed()) {
            await this.menuButton.click();
            await this.navbarContent.waitForDisplayed();
        }

        await this.languageButton.scrollIntoView();
        await this.languageButton.waitForClickable();
        await this.languageButton.click();

        await this.spanishOption.waitForClickable();
        await this.spanishOption.click();
    }
}

export default new HomePage();
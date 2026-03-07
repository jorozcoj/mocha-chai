import BasePage from "./basePage.js";

class HomePage extends BasePage {

  /*   get menuListButton() {
        return $('button[class="navbar-toggler"]')
    }

    get signUpButton() {
        return $('a[data-test="nav-sign-in"]');
    } */

    async open() {
        await super.open('/');
    }

    /* async clickMenu() {
        try {
            await this.menuListButton.click();
        } catch (error) {
            console.error('Error clicking menu button:', error);
        }
        //await this.menuListButton.click();
    } */

  /*   async clickSignIn() {
        await this.click();
    } */
}

export default new HomePage;
import BasePage from "./basePage";;

class LoginPage extends BasePage {

    get loginForm () {
        return $('div.col-lg-6.auth-form');
    }

    get registerLink () {
        return $('a[data-test="register-link"]');
    }

    async display (){
        await this.loginForm.waitForDisplayed();
    }

    async clickRegisterLink(){
        await this.registerLink.waitForClickable();
        await this.registerLink.click();
    }
}

export default new LoginPage();
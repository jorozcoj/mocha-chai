import BasePage from "./basePage";

class LoginPage extends BasePage {

    get loginForm() {
        return $('div.col-lg-6.auth-form');
    }

    get registerLink() {
        return $('a[data-test="register-link"]');
    }

    get email() {
        return $('#email')
    }

    get password() {
        return $('#password')
    }

    get submitButton() {
        return $('.btnSubmit')
    }

    async displayLogin() {
        await this.loginForm.waitForDisplayed();
    }

    async clickRegisterLink() {
        await this.registerLink.waitForClickable();
        await this.registerLink.click();
    }

    async typeCredentials(credentials) {
        await this.email.setValue(credentials.email);
        await this.password.setValue(credentials.password)
    }

    async clickSubmit() {
        await this.submitButton.click();
    }
}

export default new LoginPage();
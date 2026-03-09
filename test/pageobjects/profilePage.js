import BasePage from "./basePage";
import registerPage from "./registerPage";

class ProfilePage extends BasePage {

    get accountOptions() {
        return $('.btn-group-vertical');
    }

    get profileButton() {
        return $('a[data-test="nav-profile"]');
    }

    get updateProfileButton() {
        return $('button[data-test="update-profile-submit"]');
    }

    get successMessage() {
        return $('div[class="alert alert-success mt-3"]');
    }

    get firstName() { return $('#first_name'); }
    get lastName() { return $('#last_name'); }
    get street() { return $('#street'); }
    get postalCode() { return $('#postal_code'); }
    get city() { return $('#city'); }
    get phone() { return $('#phone'); }
    get email() { return $('#email'); }


    async displayAccountOptions() {
        await this.accountOptions.waitForDisplayed();
    }

    async clickProfileButton() {
        await this.profileButton.waitForClickable();
        await this.profileButton.click();
    }

    async waitForText() {
        await browser.waitUntil(
            async () => (await this.firstName.getValue()).length > 0,
            {
                timeout: 5000,
                timeoutMsg: 'Firstname nunca tuvo valor'
            }
        )
    }

    async clearValues (element){
        await element.click();
        await browser.keys(['Control', 'a']);
        await browser.keys('Backspace');
    }

    async modifyProfile(user) {
        
        const fields = [
        { element: this.firstName, value: user.firstName },
        { element: this.lastName, value: user.lastName },
        { element: this.street, value: user.street },
        { element: this.postalCode, value: user.postalCode },
        { element: this.city, value: user.city },
        { element: this.phone, value: user.phone },
        { element: this.email, value: user.email }
    ];

    for (const field of fields) {
        await this.clearValues(field.element);
        await field.element.addValue(field.value);
    }
    }

    async clickUpdateProfile() {
        await this.updateProfileButton.waitForClickable();
        await this.updateProfileButton.click();
    }

    async waitForSuccessMessage() {
        await this.successMessage.waitForDisplayed();
        return true;
    }
}

export default new ProfilePage();
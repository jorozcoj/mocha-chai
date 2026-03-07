import { expect, assert, should } from 'chai';

import HomePage from '../pageobjects/homePage.js';
import registerPAge from '../pageobjects/registerPage.js';

should();

describe('User Registration', () => {
    it('Should create a new account successfully', async () => {

        await HomePage.open();

        //if balseElemnt is not displayed, click menu button
        const baseElement = await $('div[id="navbarSupportedContent"]')
        const buttonMenu = await $('button[data-bs-toggle="collapse"]')

        if (!await baseElement.isDisplayed()) {
            await buttonMenu.click();
        }

        const signInLink = await $$('div[id="navbarSupportedContent"] [data-test="nav-sign-in"]');

        await signInLink[0].click();

        const loginPage = await $('div[class="col-lg-6 auth-form"]');
        const registerLink = await $('a[data-test="register-link"]');
        assert.exists(loginPage, 'the page has loaded correctly');

        registerLink.click();

        const registerPage = await $('div[class="col-lg-8 auth-form"]');

        assert.exists(registerPage, "page loaded");

        /* Fill Fields */
               const user = {
                   firstName: 'juan',
                   lastName: 'Duque',
                   birthDay: '1992-08-01',
                   street: 'Evergreen Terrace 742',
                   postalCode: '12345',
                   city: 'Springfield',
                   state: 'NY',
                   country: 'US',
                   phone: '3145879642',
                   email: 'Juan.duque@gmail.com',
                   password: 'password123'
               }
               await registerPAge.fillForm(user);

       
               (await registerPAge.registerButton.isDisplayed()).should.be.true
       
               await registerPAge.submit() 

    })
})


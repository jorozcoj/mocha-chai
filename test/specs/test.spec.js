import { expect, assert, should } from 'chai';

import registerPage from '../pageobjects/registerPage.js';
import homePage from '../pageobjects/homePage.js';

should();

describe('User Registration', () => {

    it('Should create a new account successfully', async () => {

        await homePage.open();
        await homePage.clickSignIn();

        const loginPage = await $('div.col-lg-6.auth-form');
        await loginPage.waitForDisplayed();
        assert.exists(loginPage, 'Login page loaded');


        const registerLink = await $('a[data-test="register-link"]');
        await registerLink.waitForClickable();
        await registerLink.click();


        const registerForm = await $('div.col-lg-8.auth-form');
        await registerForm.waitForDisplayed();
        
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
        };

        await registerPage.fillForm(user);

        (await registerPage.registerButton.isDisplayed()).should.be.true;

        await registerPage.submit();

    });

});

import { expect, assert, should } from 'chai';

import registerPage from '../pageobjects/registerPage.js';
import homePage from '../pageobjects/homePage.js';
import loginPage from '../pageobjects/loginPage.js';

should();

describe('User Registration', () => {

    it('Should create a new account successfully', async () => {

        await homePage.open();
        await homePage.clickSignIn();

        await loginPage.display()
        assert.exists(loginPage.loginForm, 'Login page loaded');

        await loginPage.clickRegisterLink(); 

        await registerPage.displayForm()
        
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

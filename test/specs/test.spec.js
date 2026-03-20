import { expect, assert, should } from 'chai';

import registerPage from '../pageobjects/registerPage.js';
import homePage from '../pageobjects/homePage.js';
import loginPage from '../pageobjects/loginPage.js';
import profilePage from '../pageobjects/profilePage.js';
import filterPage from '../pageobjects/filterPage.js';
import productsPage from '../pageobjects/productsPage.js';

should();

describe('Practice Software Testing', () => {
    beforeEach(async () => {
        await homePage.open();
        await browser.maximizeWindow();
    })

    it('1. Should create a new account successfully', async () => {

        await homePage.clickSignIn();

        await loginPage.displayLogin()
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
            email: 'Juan.duque5@gmail.com',
            password: 'JuanDuque*123'
        };

        await registerPage.fillForm(user);

        (await registerPage.registerButton.isDisplayed()).should.be.true;

        await registerPage.submit();

        await browser.waitUntil(
            async () => (await browser.getUrl()).includes('/auth/login'),
        )
        expect(await loginPage.loginForm.isDisplayed()).to.equal(true);
    });

    it("2. User should logs in successfully", async () => {

        const credentials = {
            email: "Juan.duque5@gmail.com",
            password: "JuanDuque*123"
        }

        await loginPage.login(credentials);
        expect(await browser.getUrl()).to.not.include('/auth/login')

    })

    it("3. User updates profile information", async () => {

        const credentials = {
            email: "Juan.duque5@gmail.com",
            password: "JuanDuque*123"
        }

        await loginPage.login(credentials);

        await profilePage.displayAccountOptions();
        await profilePage.clickProfileButton();
        await profilePage.waitForText();

        const user = {
            firstName: 'Cristian',
            lastName: 'Duque ramirez',
            birthDay: '1992-08-01',
            street: 'Evergreen Terrace 742',
            postalCode: '12345',
            city: 'Springfield',
            phone: '3145879642',
            email: 'Juan.duque5@gmail.com',
            password: 'JuanDuque*123'
        };

        await profilePage.modifyProfile(user);
        await profilePage.clickUpdateProfile();

        expect(await profilePage.waitForSuccessMessage()).to.equal(true, 'Success message should be displayed');
    })

    it("4. Filter tools by category", async () => {

        //Select only one checkBox
        await filterPage.selectOnlyOne("Hammer");
        const checkbox = await filterPage.categoryByName("Hammer");
        expect(await checkbox.isSelected()).to.equal(true);

        //Select multiple checkboxes
        await filterPage.selectMultipleCategories([
            "Wrench",
            "Pliers"
        ])

        const wrench = await filterPage.categoryByName("Wrench")
        const pliers = await filterPage.categoryByName("Pliers")

        expect(await wrench.isSelected()).to.equal(true)
        expect(await pliers.isSelected()).to.equal(true)
    });

    it("5. User should view producto details ", async () => {

        await productsPage.selectProduct();
        await productsPage.productName.waitForDisplayed();

        expect(await productsPage.productName.isDisplayed()).to.be.true;
    })

    it("6. User add products to shopping cart", async () => {

        await productsPage.selectProduct();

        const productName = await productsPage.productName.getText();

        await productsPage.addProductToCart();

        await browser.waitUntil(async () => {
            const count = Number(await productsPage.cartCounter.getText());
            return count > 0;
        });
        const counter = Number(await productsPage.cartCounter.getText());

        expect(counter).to.be.greaterThan(0);

        await productsPage.goToCart();

        const cartProduct = await $('[data-test="product-title"]').getText();


        assert.include(cartProduct, productName, "Product should appear in the cart");

    })

    it("7. User add products to favorites", async () => {
        const credentials = {
            email: "Juan.duque5@gmail.com",
            password: "JuanDuque*123"
        }

        await loginPage.login(credentials);
        await homePage.open()

        await productsPage.selectProduct();

        const productName = await productsPage.productName.getText();


        await productsPage.addProductToFavorite();

        await browser.url('/account/favorites');
        const favoriteProduct = await $('[data-test="product-name"]');
        await favoriteProduct.waitForDisplayed();

        const text = await favoriteProduct.getText();

        text.should.include(productName);

    })

    it("8. User should change language to spanish ", async () => {
        await homePage.changeLanguage()
        const currentLang = await homePage.languageButton.getText();
        expect(currentLang).to.include('ES')

    })

    it.only("9. user searches for an exact product", async () => {

        await productsPage.searchProduct("Saw")

        await productsPage.loadSearch()

        const products = await productsPage.products

        const firstProduct = products[0]

        await firstProduct.click()
    })

    afterEach(async () => {
        await browser.deleteCookies();
    })
})
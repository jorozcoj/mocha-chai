import BasePage from "./basePage";

class ProductsPage extends BasePage {

    get products() {
        return $$('.card-tittle');
    };

    get productName() {
        return $('[data-test="product-name"]')
    }

    get searchField() {
        return $('#search-query');
    }

    get searchButton() {
        return $('button[data-test="search-submit"]')
    }

    get addToCartButton() {
        return $('[data-test="add-to-cart"]');
    }

    get addToFavoriteButton() {
        return $('[data-test="add-to-favorites"]')
    }

    get cartCounter() {
        return $('[data-test="cart-quantity"]');
    }

    get cartIcon() {
        return $('[data-test="nav-cart"]');
    }

    get cartProduct() {
        return $('[data-test="product-title"]')
    }

    get completeSearch() {
        return $('[data-test=search_completed]')
    }

    get loadedSearch() {
        return $$('.card-img-wrapper')
    }


    async selectProduct() {

        await browser.waitUntil(
            async () => (await $$('[data-test^="product-"]')).length > 0,
        )
        const product = await this.products;
        await product[0].click()
    }

    async addProductToCart() {
        await this.addToCartButton.waitForClickable();
        await this.addToCartButton.click();
    }

    async addProductToFavorite() {
        await this.addToFavoriteButton.waitForClickable();
        await this.addToFavoriteButton.click();
    }

    async searchProduct(productName) {
        await this.searchField.waitForDisplayed();
        await this.searchField.setValue(productName);
        await this.searchButton.click();


    }

    async loadSearch() {

        await this.completeSearch.waitForDisplayed();
        await browser.waitUntil(async () => {
            return (await this.products).length > 0
        }, {
            timeout: 5000,
            timeoutMsg: 'Products did not load'
        })
    }

    async goToCart() {
        await this.cartIcon.waitForClickable();
        await this.cartIcon.click();
    }
}

export default new ProductsPage();
import BasePage from "./basePage";

class ProductsPage extends BasePage {

    get products() {
        return $$('[data-test^="product-"]');
    };

    get searchField () {
        return $('#search-query');
    }

    get searchButton(){
        return $('button[data-test="search-submit"]')
    }

    async selectProduct() {

        await browser.waitUntil(
            async () => (await $$('[data-test^="product-"]')).length > 0,
        )
        const product = await this.products;
        await product[0].click()
    }

    async searchProduct(productName){
        await this.searchField.waitForDisplayed();
        await this.searchField.setValue(productName);
        await this.searchButton.click();
    }

}

export default new ProductsPage
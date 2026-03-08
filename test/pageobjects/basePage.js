export default class BasePage {

    get baseElement() {
        return $('#navbarSupportedContent');
    }

    get signInElement() {
        return $('[data-test="nav-sign-in"]');
    }

    async open(path) {
        await browser.url(path);
    }

}
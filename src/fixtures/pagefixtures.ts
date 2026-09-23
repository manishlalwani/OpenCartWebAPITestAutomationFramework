
import { test as baseTest, expect } from '@playwright/test';
import { BasePage } from '../pages/BasePage';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { RegistrationPage } from '../pages/RegistrationPage';
import { SearchResultsPage } from '../pages/SearchResultsPage';
import { ProductInfoPage } from '../pages/ProductInfoPage';
import { ShoppingCartPage } from '../pages/ShoppingCartPage';


type pageFixtures = {
    basePage: BasePage;
    loginPage: LoginPage;
    homePage: HomePage;
    registrationPage: RegistrationPage;
    searchResultsPage: SearchResultsPage;
    productInfoPage: ProductInfoPage;
    shoppingCartPage: ShoppingCartPage;
}

//extend the playwright test: using baseTest.extend :  inheritance

export let test = baseTest.extend<pageFixtures>({

    basePage: async ({ page }, use) => {
        let basePage = new BasePage(page);
        await use(basePage);
    },

    loginPage: async ({ page }, use) => {
        let loginPage = new LoginPage(page);
        await use(loginPage);
    },

    homePage: async ({ page }, use) => {
        let homePage = new HomePage(page);
        await use(homePage);
    },

    registrationPage: async ({ page }, use) => {
        let registrationPage = new RegistrationPage(page);
        await use(registrationPage);
    },

    searchResultsPage: async ({ page }, use) => {
        let searchResultsPage = new SearchResultsPage(page);
        await use(searchResultsPage);
    },

    productInfoPage: async ({ page }, use) => {
        let productInfoPage = new ProductInfoPage(page);
        await use(productInfoPage);
    },

    shoppingCartPage: async ({ page }, use) => {
        let shoppingCartPage = new ShoppingCartPage(page);
        await use(shoppingCartPage);
    }
});



export { expect } from '@playwright/test';



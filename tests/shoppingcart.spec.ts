import { test, expect } from '../src/fixtures/pagefixtures';



test.beforeEach(async ({ loginPage }) => {
    await loginPage.gotoLoginPage();
    await loginPage.doLogin(process.env.USERNAME!, process.env.PASSWORD!);
});


test('@smoke verify shopping cart header', async ({ homePage, searchResultsPage, productInfoPage, shoppingCartPage }) => {
    await homePage.doSearch('macbook');
    await searchResultsPage.selectProduct('MacBook Pro');
    await productInfoPage.addItemToCart();
    await productInfoPage.moveToShoppingCart();
    expect(await shoppingCartPage.getProductHeader()).toContain('Shopping Cart');
});

test.skip('@regression verify quantity count cart ', async ({ homePage, searchResultsPage, productInfoPage, shoppingCartPage }) => {
    await homePage.doSearch('macbook');
    await searchResultsPage.selectProduct('MacBook Pro');
    await productInfoPage.addItemToCart();
    await productInfoPage.moveToShoppingCart();
    expect(await shoppingCartPage.getQuantityCount()).toBe('2');
});



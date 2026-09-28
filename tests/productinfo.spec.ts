import { CsvError } from 'csv-parse/browser/esm';
import { test, expect } from '../src/fixtures/pagefixtures';
import { CsvHelper } from '../src/utils/CsvHelper';



test.beforeEach(async ({ loginPage }) => {
    await loginPage.gotoLoginPage();
    await loginPage.doLogin(process.env.USERNAME!, process.env.PASSWORD!);
});




test('verify product header', async ({ homePage, searchResultsPage, productInfoPage, page }) => {
    await homePage.doSearch('macbook');
    await searchResultsPage.selectProduct('MacBook Pro');
    expect(await productInfoPage.getProductHeader()).toBe('MacBook Pro');
    //await page.pause();

});


test('verify product images count', async ({ homePage, searchResultsPage, productInfoPage, page }) => {
    await homePage.doSearch('macbook');
    await searchResultsPage.selectProduct('MacBook Pro');
    expect(await productInfoPage.getProductImagesCount()).toBe(4);
    //await page.pause();

});



test('verify product data', async ({ homePage, searchResultsPage, productInfoPage, page }) => {
    await homePage.doSearch('macbook');
    await searchResultsPage.selectProduct('MacBook Pro');
    let actualProductInfoMap = await productInfoPage.getProductInfo();
    console.log('Actual Product Details: ', actualProductInfoMap);
    expect.soft(actualProductInfoMap.get('productheader')).toBe('MacBook Pro');
    expect.soft(actualProductInfoMap.get('productimagecount')).toBe(4);
    expect.soft(actualProductInfoMap.get('Brand')).toBe('Apple');
    expect.soft(actualProductInfoMap.get('Product Code')).toBe('Product 18');
    expect.soft(actualProductInfoMap.get('Reward Points')).toBe('800');
    expect.soft(actualProductInfoMap.get('Availability')).toBe('Out Of Stock');
    expect.soft(actualProductInfoMap.get('productprice')).toBe('$2,000.00');
    expect.soft(actualProductInfoMap.get('extraprice')).toBe('$2,000.00');
});


//common features test 

test('App logo exist or not on Login page', ({ basePage }) => {
    expect(basePage.isLogoVisible).toBeTruthy();
});

test('search box exist or not on Login page', ({ basePage }) => {
    expect(basePage.isSearchBoxVisible).toBeTruthy();
});

test('Cart exist or not on Login page', ({ basePage }) => {
    expect(basePage.isCartButtonVisible).toBeTruthy();
});

test('Footer Links exist or not on Login page', ({ basePage }) => {
    expect(basePage.getPageFootersCount).toBe(16);
});
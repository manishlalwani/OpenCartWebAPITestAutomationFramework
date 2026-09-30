import { test, expect } from '../src/fixtures/pagefixtures';
import { CsvHelper } from '../src/utils/CsvHelper';



test.beforeEach(async ({ loginPage }) => {
    await loginPage.gotoLoginPage();
    await loginPage.doLogin(process.env.USERNAME!, process.env.PASSWORD!);
});

//data provider
let productData = CsvHelper.readCsv('src/testdata/product.csv');
for (let row of productData) {
    test(`@regression verify search results for ${row.searchkey} -- ${row.productname}`, async ({ homePage, searchResultsPage }) => {
        await homePage.doSearch(row.searchkey);
        let actualResultCount = await searchResultsPage.getProductSearchResultsCount();
        console.log('Search Results Count : ', actualResultCount);
        expect(actualResultCount).toBe(Number(row.resultcount));

    });
}

for (let row of productData) {
    test(`@regression verify user is able to land on product page for ${row.searchkey} -- ${row.productname}`, async ({ homePage, searchResultsPage, page }) => {
        await homePage.doSearch(row.searchkey);
        await searchResultsPage.selectProduct(row.productname);
        expect(await page.title()).toBe(row.productname);

    })
}
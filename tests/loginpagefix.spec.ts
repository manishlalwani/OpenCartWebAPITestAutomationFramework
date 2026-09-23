import { test, expect } from '../src/fixtures/pagefixtures';
import { CsvHelper } from '../src/utils/CsvHelper';
import { JsonHelper } from '../src/utils/JsonHelper';




test.beforeEach(async ({ loginPage }) => {

    await loginPage.gotoLoginPage();

});

test('login page title test', async ({ loginPage }) => {
    let pageTitle = await loginPage.getPageTitle();
    console.log('Page title is : ', pageTitle);
    expect(pageTitle).toBe('Account Login');
});

test('forgot password link test', async ({ loginPage }) => {
    expect(await loginPage.isForgottenPasswordLinkExist()).toBeTruthy();
});

test('returning customer header present test', async ({ loginPage }) => {
    expect(await loginPage.isReturningCustomerHeaderPresent()).toBeTruthy();
});

test('user is able to login to the application test', async ({ loginPage, homePage }) => {
    await loginPage.doLogin(process.env.USERNAME!, process.env.PASSWORD!);
    expect.soft(await homePage.isLogoutLinkExist()).toBeTruthy();
    expect.soft(await homePage.getHomePageTitle()).toBe('My Account');
});

test('new user is continue button enabled test', async ({ loginPage }) => {
    expect(await loginPage.isnewCustomerContinueButtonEnabled()).toBeTruthy();
});


//DD_1 - Read Data Directly from CSV File
let testCsvData = CsvHelper.readCsv('src/testdata/logindata.csv');
for (let row of testCsvData) {
    test(`login to app with invalid credentials for ${row.username} - ${row.password}`, async ({ loginPage }) => {
        await loginPage.doLogin(row.username, row.password);
        expect(await loginPage.isInvalidLoginErrorDisplayed()).toBeTruthy();
    });
}
//DD_2 - Read Data Directly from JSON File
let testJsonData = JsonHelper.readJson('src/testdata/logindata.json');
for (let row of testJsonData) {
    test(`login to app with invalid credentials with json for ${row.username} - ${row.password}`, async ({ loginPage }) => {
        await loginPage.doLogin(row.username, row.password);
        expect(await loginPage.isInvalidLoginErrorDisplayed()).toBeTruthy();
    });
}

//common features test 

test('App logo exist or not on Login page', ({ basePage }) => {
    expect(basePage.isLogoVisible()).toBeTruthy();
});

test('search box exist or not on Login page', ({ basePage }) => {
    expect(basePage.isSearchBoxVisible()).toBeTruthy();
});

test('Cart exist or not on Login page', ({ basePage }) => {
    expect(basePage.isCartButtonVisible()).toBeTruthy();
});

test('Footer Links exist or not on Login page', ({ basePage }) => {
    expect(basePage.getPageFootersCount()).toBe(16);
});
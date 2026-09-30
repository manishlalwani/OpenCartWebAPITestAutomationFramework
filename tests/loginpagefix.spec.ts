import { test, expect } from '../src/fixtures/pagefixtures';
import { CsvHelper } from '../src/utils/CsvHelper';
import { JsonHelper } from '../src/utils/JsonHelper';
import * as allure from "allure-js-commons";
import { log, meta, testData } from 'reporting-labs';




test.beforeEach(async ({ loginPage }) => {

    await loginPage.gotoLoginPage();

});

test('@smoke login page title test', async ({ loginPage }) => {

    meta({ priority: 'P1', severity: 'critical', owner: 'manish', story: '101', epic: 'epic300', feature: '30', issue: 'bug35' });
    let pageTitle = await loginPage.getPageTitle();
    console.log('Page title is : ', pageTitle);

    await log('Login page title', pageTitle);
    expect(pageTitle).toBe('Account Login');
});

test('@smoke forgot password link test', async ({ loginPage }) => {
    meta({ priority: 'P2', severity: 'blocker', owner: 'manish', story: '102', epic: 'epic300', feature: '31', issue: 'bug36' });

    expect(await loginPage.isForgottenPasswordLinkExist()).toBeTruthy();
});

test('@smoke returning customer header present test', async ({ loginPage }) => {
    meta({ priority: 'P2', severity: 'major', owner: 'manish', story: '102', epic: 'epic300', feature: '31', issue: 'bug37' });

    expect(await loginPage.isReturningCustomerHeaderPresent()).toBeTruthy();
});

test('@regression user is able to login to the application test', async ({ loginPage, homePage }) => {

    meta({ priority: 'P1', severity: 'blocker', owner: 'manish', story: 'US103', epic: 'epic300', feature: '31', issue: 'bug38' });
    await testData({ username: process.env.USERNAME!, password: process.env.PASSWORD! }, 'Login');



    await allure.suite("Login Tests");
    await allure.severity("critical");
    await allure.feature("Authentication");
    await allure.story("Valid Login");
    await allure.description("Verify user can login with valid credentials");

    await allure.step("Login with valid credentials", async () => {
        await loginPage.doLogin(process.env.USERNAME!, process.env.PASSWORD!);
    });
    await allure.step("verify logout link is visible", async () => {
        expect.soft(await homePage.isLogoutLinkExist()).toBeTruthy();
    });

    await allure.step("verify home page title is visible", async () => {
        expect.soft(await homePage.getHomePageTitle()).toBe('My Account');
    });


});

test('new user is continue button enabled test', async ({ loginPage }) => {
    expect(await loginPage.isnewCustomerContinueButtonEnabled()).toBeTruthy();
});


//DD_1 - Read Data Directly from CSV File
let testCsvData = CsvHelper.readCsv('src/testdata/logindata.csv');
for (let row of testCsvData) {
    test(`@regression login to app with invalid credentials for ${row.username} - ${row.password}`, async ({ loginPage }) => {
        meta({ priority: 'P2', severity: 'major', owner: 'manish', story: '102', epic: 'epic300', feature: '31', issue: 'bug37' });
        await testData(testCsvData, "Invalid Login Data");
        await loginPage.doLogin(row.username, row.password);
        expect(await loginPage.isInvalidLoginErrorDisplayed()).toBeTruthy();
    });
}
//DD_2 - Read Data Directly from JSON File
let testJsonData = JsonHelper.readJson('src/testdata/logindata.json');
for (let row of testJsonData) {
    test(`@regression login to app with invalid credentials with json for ${row.username} - ${row.password}`, async ({ loginPage }) => {
        meta({ priority: 'P2', severity: 'major', owner: 'manish', story: '102', epic: 'epic300', feature: '31', issue: 'bug37' });
        await testData(testJsonData, "Invalid Login Data");
        await loginPage.doLogin(row.username, row.password);
        expect(await loginPage.isInvalidLoginErrorDisplayed()).toBeTruthy();
    });
}

//common features test 

test('@smoke App logo exist or not on login page', async ({ basePage }) => {
    expect(await basePage.isLogoVisible()).toBeTruthy();
});

test('@smoke search box exist or not on login page', async ({ basePage }) => {
    expect(await basePage.isSearchBoxVisible()).toBeTruthy();
});

test('@smoke Cart exist or not on login page', async ({ basePage }) => {
    expect(await basePage.isCartButtonVisible()).toBeTruthy();
});

test('@smoke Footer Links exist or not on login page', async ({ basePage }) => {
    expect(await basePage.getPageFootersCount()).toBe(16);
});
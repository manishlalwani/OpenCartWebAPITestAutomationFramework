import { test, expect } from "@playwright/test";
import { LoginPage } from "../src/pages/LoginPage";
import { HomePage } from "../src/pages/HomePage";


let loginPage: LoginPage;
let homePage: HomePage;

test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.gotoLoginPage();
    homePage = new HomePage(page);
});

test.skip('login page title test', async ({ page }) => {
    let pageTitle = await loginPage.getPageTitle();
    console.log('Page title is : ', pageTitle);
    expect(pageTitle).toBe('Account Login');
});

test.skip('forgot password link test', async ({ page }) => {
    expect(await loginPage.isForgottenPasswordLinkExist()).toBeTruthy();
});

test.skip('returning customer header present test', async ({ page }) => {
    expect(await loginPage.isReturningCustomerHeaderPresent()).toBeTruthy();
});

test.skip('user is able to login to the application test', async ({ page }) => {
    await loginPage.doLogin('jacobbetthel@test.com', 'test123');
    expect.soft(await homePage.isLogoutLinkExist()).toBeTruthy();
    expect.soft(await homePage.getHomePageTitle()).toBe('My Account');
});

test.skip('new user is continue button enabled test', async ({ page }) => {
    expect(await loginPage.isnewCustomerContinueButtonEnabled()).toBeTruthy();
});
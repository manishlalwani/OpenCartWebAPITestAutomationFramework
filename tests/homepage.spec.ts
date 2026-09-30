import { test, expect } from "@playwright/test";
import { LoginPage } from "../src/pages/LoginPage";
import { HomePage } from "../src/pages/HomePage";


let loginPage: LoginPage;
let homePage: HomePage;

test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.gotoLoginPage();
    await loginPage.doLogin('jacobbetthel@test.com', 'test123');
    homePage = new HomePage(page);

});

test.skip('@smoke home page title test', async () => {
    let pageTitle = await homePage.getHomePageTitle();
    console.log('Home page title is ', pageTitle);
    expect(pageTitle).toBe('My Account');
});

test.skip('@smoke logout link exists test', async () => {
    expect(await homePage.isLogoutLinkExist()).toBeTruthy();
});

test.skip('@smoke home page headers exists test', async () => {
    let allHeaders: string[] = await homePage.getHomeHeaders();
    expect.soft(allHeaders).toHaveLength(4);
    expect.soft(allHeaders).toEqual(['My Account', 'My Orders', 'My Affiliate Account', 'Newsletter']);
});
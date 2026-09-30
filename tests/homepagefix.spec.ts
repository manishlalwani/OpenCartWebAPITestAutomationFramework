import { test, expect } from '../src/fixtures/pagefixtures';



test.beforeEach(async ({ loginPage }) => {
    await loginPage.gotoLoginPage();
    await loginPage.doLogin('jacobbetthel@test.com', 'test123');
});

test('@smoke home page title test', async ({ homePage }) => {
    let pageTitle = await homePage.getHomePageTitle();
    console.log('Home page title is ', pageTitle);
    expect(pageTitle).toBe('My Account');
});

test('@smoke logout link exists test', async ({ homePage }) => {
    expect(await homePage.isLogoutLinkExist()).toBeTruthy();
});

test('@regression home page headers exists test', async ({ homePage }) => {
    let allHeaders: string[] = await homePage.getHomeHeaders();
    expect.soft(allHeaders).toHaveLength(4);
    expect.soft(allHeaders).toEqual(['My Account', 'My Orders', 'My Affiliate Account', 'Newsletter']);
});


//common features test 

test('@smoke App logo exist or not on home page', async ({ basePage }) => {
    expect(await basePage.isLogoVisible()).toBeTruthy();
});

test('@smoke search box exist or not on home page', async ({ basePage }) => {
    expect(await basePage.isSearchBoxVisible()).toBeTruthy();
});

test('@smoke Cart exist or not on home page', async ({ basePage }) => {
    expect(await basePage.isCartButtonVisible()).toBeTruthy();
});

test('@smoke Footer Links exist or not on home page', async ({ basePage }) => {
    expect(await basePage.getPageFootersCount()).toBe(16);
});

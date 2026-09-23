import { test, expect } from '../src/fixtures/pagefixtures';



test.beforeEach(async ({ loginPage }) => {
    await loginPage.gotoLoginPage();
    await loginPage.doLogin('jacobbetthel@test.com', 'test123');
});

test('home page title test', async ({ homePage }) => {
    let pageTitle = await homePage.getHomePageTitle();
    console.log('Home page title is ', pageTitle);
    expect(pageTitle).toBe('My Account');
});

test('logout link exists test', async ({ homePage }) => {
    expect(await homePage.isLogoutLinkExist()).toBeTruthy();
});

test('home page headers exists test', async ({ homePage }) => {
    let allHeaders: string[] = await homePage.getHomeHeaders();
    expect.soft(allHeaders).toHaveLength(4);
    expect.soft(allHeaders).toEqual(['My Account', 'My Orders', 'My Affiliate Account', 'Newsletter']);
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

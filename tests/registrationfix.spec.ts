import { test, expect } from '../src/fixtures/pagefixtures';
import { CsvHelper } from '../src/utils/CsvHelper';

test.beforeEach(async ({ loginPage }) => {

    await loginPage.gotoLoginPage();
    await loginPage.gotoRegistrationPage();

});

test('registration page header test', async ({ registrationPage }) => {
    let header = await registrationPage.getRegistrationHeader();
    console.log('Page title is : ', header);
    expect(header).toBe('Register Account');
});


test('registration page account creation test', async ({ registrationPage }) => {
    let firstName = 'manish';
    let lastName = 'lalwani';
    let email = 'testemail1@email.com';
    let telephone = '3343431234';
    let password = 'wrong1234';
    let passwordConfirm = 'wrong1234';
    let privacyPolicy = true;

    await registrationPage.createAccount(firstName, lastName, email, telephone, password, passwordConfirm, privacyPolicy);
    expect(await registrationPage.isCreateAccountMessageDisplayed()).toBeTruthy();
});


let testData = CsvHelper.readCsv('src/testdata/registrationuser.csv')
for (let row of testData) {
    test(`registration page account creation with users ${row.firstname} -- ${row.lastname}`, async ({ registrationPage }) => {
        await registrationPage.createAccount(row.firstname, row.lastname, row.email, row.telephone, row.password, row.passwordconfirm, true);
        expect(await registrationPage.isCreateAccountMessageDisplayed()).toBeTruthy();
    });
}


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
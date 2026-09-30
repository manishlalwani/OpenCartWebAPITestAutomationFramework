import { test, expect } from '../src/fixtures/pagefixtures';
import { CsvHelper } from '../src/utils/CsvHelper';

test.beforeEach(async ({ loginPage }) => {

    await loginPage.gotoLoginPage();
    await loginPage.gotoRegistrationPage();

});

test('@smoke registration page header test', async ({ registrationPage }) => {
    let header = await registrationPage.getRegistrationHeader();
    console.log('Page title is : ', header);
    expect(header).toBe('Register Account');
});


test('@smoke registration page account creation test', async ({ registrationPage }) => {
    let firstName = 'manish';
    let lastName = 'lalwani';
    let email = `testemail1${Date.now()}@email.com`;
    let telephone = '3343431234';
    let password = 'wrong1234';
    let passwordConfirm = 'wrong1234';
    let privacyPolicy = true;

    await registrationPage.createAccount(firstName, lastName, email, telephone, password, passwordConfirm, privacyPolicy);
    expect(await registrationPage.isCreateAccountMessageDisplayed()).toBeTruthy();
});


let testData = CsvHelper.readCsv('src/testdata/registrationuser.csv')
for (let row of testData) {
    test.skip(`@regression registration page account creation with users ${row.firstname} -- ${row.lastname}`, async ({ registrationPage }) => {
        let email = `testemail1${Date.now()}@email.com`;
        await registrationPage.createAccount(row.firstname, row.lastname, email, row.telephone, row.password, row.passwordconfirm, true);
        expect(await registrationPage.isCreateAccountMessageDisplayed()).toBeTruthy();
    });
}


//common features test 

test.skip('@smoke App logo exist or not on registration page', async ({ basePage }) => {
    expect(await basePage.isLogoVisible()).toBeTruthy();
});

test.skip('@smoke search box exist or not on registration page', async ({ basePage }) => {
    expect(await basePage.isSearchBoxVisible()).toBeTruthy();
});

test.skip('@smoke Cart exist or not on registration page', async ({ basePage }) => {
    expect(await basePage.isCartButtonVisible()).toBeTruthy();
});

test.skip('@smoke Footer Links exist or not on registration page', async ({ basePage }) => {
    expect(await basePage.getPageFootersCount()).toBe(16);
});
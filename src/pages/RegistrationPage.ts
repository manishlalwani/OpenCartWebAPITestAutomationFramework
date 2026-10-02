import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class RegistrationPage extends BasePage {

    //1. Private locators
    private readonly registrationHeader: Locator;
    private readonly firstName: Locator;
    private readonly lastName: Locator;
    private readonly email: Locator;
    private readonly telephone: Locator;
    private readonly password: Locator;
    private readonly passwordCnfrm: Locator;
    private readonly privacyPolicy: Locator;
    private readonly continueBtn: Locator;
    private readonly acctSuccessMessage: Locator;










    //2. constructor  of the page  init the locators

    constructor(page: Page) {
        super(page);
        this.registrationHeader = page.getByRole('heading', { name: 'Register Account', level: 1 });
        this.firstName = page.getByRole('textbox', { name: '* First Name' });
        this.lastName = page.getByRole('textbox', { name: '* Last Name' });
        this.email = page.getByRole('textbox', { name: '* E-Mail' });
        this.telephone = page.getByRole('textbox', { name: '* Telephone' });
        this.password = page.getByRole('textbox', { name: '* Password', exact: true });
        this.passwordCnfrm = page.getByRole('textbox', { name: '* Password Confirm' });
        this.privacyPolicy = page.locator('[name="agree"]');
        this.continueBtn = page.getByRole('button', { name: 'Continue' });
        this.acctSuccessMessage = page.getByRole('heading', { name: 'Your Account Has Been Created!', level: 1 });
    }

    //3. public page actions (methods) / behavior : encpasulation

    async getRegistrationHeader() {
        return await this.registrationHeader.textContent();
    }


    async createAccount(firstName: string, lastName: string, email: string, telephone: string, password: string, passwordConfirm: string, privacyPolicy: boolean) {
        await this.firstName.fill(firstName);
        await this.lastName.fill(lastName);
        await this.email.fill(email);
        await this.telephone.fill(telephone);
        await this.password.fill(password);
        await this.passwordCnfrm.fill(passwordConfirm);
        if(privacyPolicy){
        await this.privacyPolicy.check();}
        await this.continueBtn.click();
    }


    async isCreateAccountMessageDisplayed(): Promise<boolean> {
        await this.acctSuccessMessage.waitFor({ state: 'visible' });
        return await this.acctSuccessMessage.isVisible();
    }


}
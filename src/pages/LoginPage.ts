import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class LoginPage extends BasePage {

    //1. Private locators
    private readonly emailId: Locator;
    private readonly password: Locator;
    private readonly loginBtn: Locator;
    private readonly forgottenPasswordLink: Locator;
    private readonly loginErrorMesage: Locator;
    private readonly returningCustomerHeader: Locator;
    private readonly newCustomerContinueButton: Locator;
    private readonly registerLink: Locator;









    //2. constructor  of the page  init the locators

    constructor(page: Page) {
        super(page);
        this.emailId = page.getByRole('textbox', { name: 'E-Mail Address' });
        this.password = page.getByRole('textbox', { name: 'Password' });
        this.loginBtn = page.getByRole('button', { name: 'Login' });
        this.forgottenPasswordLink = page.getByRole('link', { name: 'Forgotten Password' }).first();
        this.loginErrorMesage = page.locator('.alert.alert-danger.alert-dismissible');
        this.returningCustomerHeader = page.getByRole('heading', { name: 'Returning Customer', level: 2 });
        this.newCustomerContinueButton = page.getByRole('link', { name: 'Continue' });
        this.registerLink = page.locator('#column-right').getByRole('link', { name: 'Register' });
    }

    //3. public page actions (methods) / behavior : encpasulation

    async gotoLoginPage(): Promise<void> {
        await this.page.goto('opencart/index.php?route=account/login');
    }

    async isForgottenPasswordLinkExist(): Promise<boolean> {
        return await this.forgottenPasswordLink.isVisible();
    }


    async doLogin(username: string, password: string): Promise<void> {
        console.log(`user creds : ${username} -- ${password}`);
        await this.emailId.fill(username);
        await this.password.fill(password);
        await this.loginBtn.click();
    }

    async isInvalidLoginErrorDisplayed(): Promise<boolean> {
        return await this.loginErrorMesage.isVisible();
    }

    async isReturningCustomerHeaderPresent(): Promise<boolean> {
        return await this.returningCustomerHeader.isVisible();
    }

    async isnewCustomerContinueButtonEnabled(): Promise<boolean> {
        return await this.newCustomerContinueButton.isEnabled();
    }

    async gotoRegistrationPage(): Promise<void> {
        await this.registerLink.click();
    }



}
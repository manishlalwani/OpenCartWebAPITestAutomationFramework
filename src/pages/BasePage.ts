import { Locator, Page } from "@playwright/test";

export class BasePage {

    protected readonly page: Page;

    //common locators across all pages

    protected readonly logo: Locator;
    protected readonly searchBox: Locator;
    protected readonly searchIcon: Locator;
    protected readonly footerLinks: Locator;
    protected readonly currencyDrpDwn: Locator;
    protected readonly cartBtn: Locator;


    constructor(page: Page) {
        this.page = page;
        this.logo = page.getByRole('img', { name: 'naveenopencart' });
        this.searchBox = page.getByRole('textbox', { name: 'Search' });
        this.searchIcon = page.locator('div#search button');
        this.footerLinks = page.locator('footer a');
        this.currencyDrpDwn = page.locator('form#form-currency');
        this.cartBtn = page.locator('span#cart-total');
    }


    // App common features -- footer, logo, search

    async isLogoVisible(): Promise<Boolean> {
        await this.logo.waitFor({ state: 'visible' });
        return await this.logo.isVisible();
    }

    async isSearchBoxVisible(): Promise<Boolean> {
        await this.searchBox.waitFor({ state: 'visible' });
        return await this.searchBox.isVisible();
    }

    async isCurrentDropDownVisible(): Promise<Boolean> {
        await this.currencyDrpDwn.waitFor({ state: 'visible' });
        return await this.currencyDrpDwn.isVisible();
    }

    async isCartButtonVisible(): Promise<Boolean> {
        await this.cartBtn.first().waitFor({ state: 'visible' });
        return await this.cartBtn.isVisible();
    }

    async getPageFootersCount(): Promise<number> {
        await this.footerLinks.first().waitFor({ state: 'visible' });
        return await this.footerLinks.count();
    }

    async getPageFooters(): Promise<string[]> {
        await this.footerLinks.waitFor({ state: 'visible' });
        return await this.footerLinks.allInnerTexts();
    }


    ///page level generic methods

    async getPageTitle(): Promise<string> {
        return await this.page.title();
    }

    getPageCurrentURL(): string {
        return this.page.url();
    }

    async waitForPageLoad() {
        await this.page.waitForLoadState('load');
    }

    async takeScreenShot(name: string) {
        return await this.page.screenshot({
            fullPage: true,
            path: `reports/screenshot/${name}.png`
        })
    }


}
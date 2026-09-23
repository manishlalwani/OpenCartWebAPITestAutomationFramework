import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class SearchResultsPage extends BasePage {

    //1. Private locators
    private readonly searchResults: Locator;











    //2. constructor  of the page  init the locators

    constructor(page: Page) {
        super(page);
        this.searchResults = page.locator('div.product-layout');

    }

    //3. public page actions (methods) / behavior : encpasulation

    async getProductSearchResultsCount(): Promise<number> {
        return await this.searchResults.count();
    }

    async selectProduct(productName: string): Promise<void> {
        console.log('product name ', productName);
        await this.page.getByRole('link', { name: productName, exact: true }).first().click();
    }




}
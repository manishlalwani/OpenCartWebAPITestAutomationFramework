import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class ShoppingCartPage extends BasePage {

    //1. Private locators
    private readonly header: Locator;
    private readonly quantity : Locator;
    


    //2. constructor  of the page  init the locators

    constructor(page: Page) {
        super(page);
        this.header = page.getByRole('heading', { level: 1 });
        this.quantity = page.locator('[name*="quantity"]');

    }

    //3. public page actions (methods) / behavior : encpasulation

    async getProductHeader(): Promise<string> {
        return await this.header.innerText();
    }
    async getQuantityCount(){
        let text = await this.quantity.getAttribute('value')
        console.log(text);
        return text;
    }

 

    




}
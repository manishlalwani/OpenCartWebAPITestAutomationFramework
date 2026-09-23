import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class ProductInfoPage extends BasePage {

    //1. Private locators
    private readonly header: Locator;
    private readonly productImages: Locator;
    private readonly productMetaData: Locator;
    private readonly productPricing: Locator;
    private productInfoMap: Map<string, string | number>;
    private readonly quantity : Locator;
    private readonly addToCart : Locator;
    private readonly shoppingCartLink : Locator;


    //2. constructor  of the page  init the locators

    constructor(page: Page) {
        super(page);
        this.header = page.getByRole('heading', { level: 1 });
        this.productImages = page.locator('div#content li img');
        this.productMetaData = page.locator('div#content ul.list-unstyled:nth-of-type(1) li');
        this.productPricing = page.locator('div#content ul.list-unstyled:nth-of-type(2) li');
        this.productInfoMap = new Map<string, string | number>();
        this.quantity = page.getByRole('textbox', { name: 'Qty' });
        this.addToCart = page.getByRole('button', { name: 'Add to Cart' });
        this.shoppingCartLink = page.getByRole('link', { name: 'shopping cart' });

    }

    //3. public page actions (methods) / behavior : encpasulation

    async getProductHeader(): Promise<string> {
        return await this.header.innerText();
    }

    async getProductImagesCount(): Promise<number> {
        await this.productImages.first().waitFor({ state: 'visible' });
        return await this.productImages.count();
    }

    async getProductInfo(): Promise<Map<string, string | number>> {
        this.productInfoMap.set('productheader', await this.getProductHeader());
        this.productInfoMap.set('productimagecount', await this.getProductImagesCount());
        await this.getProductMetaData();
        await this.getProductPriceData();
        return this.productInfoMap;
    }

    private async getProductMetaData(): Promise<void> {
        let metaData = await this.productMetaData.allInnerTexts();
        for (let data of metaData) {
            console.log(data);
            let meta = data.split(':');
            let metaKey = meta[0].trim();
            let metaValue = meta[1].trim();
            console.log(meta[0]);
            console.log(meta[1]);
            this.productInfoMap.set(metaKey, metaValue);
        }
    }

    private async getProductPriceData(): Promise<void> {

        let priceData = await this.productPricing.allInnerTexts();
        let productPrice = priceData[0].trim();
        let exProductPrice = priceData[1].split(':')[1].trim();
        this.productInfoMap.set('productprice', productPrice);
        this.productInfoMap.set('extraprice', exProductPrice);
    }


    async addItemToCart(){
        await this.quantity.fill('2');
        await this.addToCart.click();
    }

    async moveToShoppingCart(){
        await this.shoppingCartLink.click();
    }




}
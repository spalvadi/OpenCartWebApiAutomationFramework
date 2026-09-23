import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class ProductInfoPage extends BasePage {

//private locators 

private readonly header :Locator ;
private readonly productImages:Locator;
private readonly productMetadata:Locator;
private readonly productPricing:Locator;
private productInfomap: Map<string,string|number>;


//const ..of the class ..init the locators 

constructor(page:Page) {

    super(page);
    this.header = page.getByRole('heading', { name: 'MacBook Pro', level: 1 });
    this.productImages =  page.locator('div#content li img');
    this.productMetadata=page.locator('div#content ul.list-unstyled:nth-of-type(1) li');
    this.productPricing=page.locator('div#content ul.list-unstyled:nth-of-type(2) li');
    this.productInfomap = new Map<string,string|number>();


}

    async getProductHeader():Promise<string>
    {

    return await this.header.innerText();

    }

    async getProductImagesCount():Promise<number>
    {
    await this.productImages.first().waitFor({state:'visible'});
    return await this.productImages.count();

    }

  private  async getProductMetaData():Promise<void>
    {
    let metadata=await this.productMetadata.allInnerTexts();

        for (let data of metadata)

            {
                let meta=data.split(':');
                let metaKey=meta[0].trim();
                let metaValue=meta[1].trim();
                this.productInfomap.set(metaKey,metaValue);

            }

    }

//2000.00
/// Ex Tax :$2000.00

    private async getProductPricingData():Promise<void>
    {
    let pricingData=await this.productPricing.allInnerTexts();
    let productPrice = pricingData[0].trim();
    let exTaxPrice=pricingData[1].split(':')[1].trim();
    this.productInfomap.set('productPrice',productPrice);
    this.productInfomap.set('exTaxPrice',exTaxPrice);


    }

    async getProductInfo():Promise<Map<string,string|number>>
    {
        this.productInfomap.set('productHeader',await this.getProductHeader());
        this.productInfomap.set('productImagesCount',await this.getProductImagesCount());
        await this.getProductMetaData();
        await this.getProductPricingData();
        return this.productInfomap;

    }

}
import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class HomePage extends BasePage {

//private locators 

private readonly logoutLink:Locator;
private readonly headers :Locator ;
private readonly searchBox:Locator;
private readonly searchIcon:Locator;

//const ..of the class ..init the locators 

constructor(page:Page) {

    super(page);
    this.logoutLink = page.getByRole('link', { name: 'Logout' });
    this.headers = page.getByRole('heading', {level: 2 });
    this.searchBox=page.getByRole('textbox', { name: 'Search' });
    this.searchIcon = page.locator('#search button');

}

async isLogoutLinkExist() :Promise<boolean>
{
    return await this.logoutLink.isVisible();
}

async getHomePageHeaders() :Promise<string[]>
{
    return await this.headers.allInnerTexts();
}


async getHomePageTitle():Promise<String>{
    return await this.page.title();

}

async doSearch(searchKey:string) :Promise<void>
{
console.log('search word is', searchKey);
await this.searchBox.fill(searchKey);
await this.searchIcon.click();

}

}
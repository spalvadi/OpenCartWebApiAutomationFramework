import{test,expect} from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage'
import {HomePage} from '../src/pages/HomePage'


//references 
let loginPage:LoginPage;
let homePage :HomePage;

test.beforeEach(async ({ page }) =>
{

loginPage =new LoginPage(page);
await loginPage.goToLoginPage();
await loginPage.doLogin('pwapril@pw.com','pw123');
homePage =new HomePage(page);

})

test.skip('Home page title test',async () => {

    
    let pageTitle = await homePage.getHomePageTitle();
    console.log('Home page title :',pageTitle);
    expect(pageTitle).toBe('My Account');

} );

test.skip('logout link exists test', async () =>
{

  expect( await homePage.isLogoutLinkExist()).toBeTruthy();


});

test.skip('Home page headers exists test',async () => {

    
    let allHeaders = await homePage.getHomePageHeaders();
    console.log('allHeaders',allHeaders);
    expect.soft(allHeaders).toHaveLength(4);
    expect.soft(allHeaders).toEqual(
        [
        'My Account',
        'My Orders',
        'My Affiliate Account',
        'Newsletter'
    ]);


} );







import{test,expect} from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage'
import { HomePage } from '../src/pages/HomePage';


let loginPage:LoginPage;
let homePage:HomePage;

test.beforeEach(async ({page}) =>
{
loginPage = new LoginPage(page);
await loginPage.goToLoginPage();
homePage=new HomePage(page);
})


test.skip('Login page title test',async () => {

    
    let pageTitle = await loginPage.getLoginPageTitle();
    console.log('Login page title :',pageTitle);
    expect(pageTitle).toBe('Account Login');

} );

test.skip('Forgot pwd link exist test ',async () => {

    
    expect(await loginPage.isForgottenPwdLinkExist()).toBeTruthy();

} );

test.skip('user is able to login to the application test ',async () => {

    
await loginPage.doLogin('pwapril@pw.com','pw123');
expect.soft(await homePage.isLogoutLinkExist()).toBeTruthy();
expect.soft(await homePage.getHomePageTitle()).toBe('My Account');

} );



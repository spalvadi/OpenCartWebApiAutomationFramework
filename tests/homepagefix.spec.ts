import { test,expect } from '../src/fixtures/pagefixtures';
import { LoginPage } from '../src/pages/LoginPage';

test.beforeEach(async ({ loginPage }) =>
{

await loginPage.goToLoginPage();
await loginPage.doLogin(process.env.USERNAME,process.env.PASSWORD);

});

test ('Home page title test',async ({homePage}) => {

    
    let pageTitle = await homePage.getHomePageTitle();
    console.log('Home page title :',pageTitle);
    expect(pageTitle).toBe('My Account');

} );

test('logout link exists test', async ({homePage}) =>
{

  expect( await homePage.isLogoutLinkExist()).toBeTruthy();


});

test ('Home page headers exists test',async ({homePage}) => {

    
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



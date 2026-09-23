import { test,expect } from '../src/fixtures/pagefixtures';
import { ProductInfoPage } from '../src/pages/ProductInfoPage';

test.beforeEach(async ({ loginPage }) =>
{

await loginPage.goToLoginPage();
await loginPage.doLogin(process.env.USERNAME,process.env.PASSWORD);

});

test ('Verify the product header',async ({homePage,searchResultsPage,productInfoPage}) =>

{

await homePage.doSearch('macbook');
await searchResultsPage.selectProduct('MacBook Pro');
expect (await productInfoPage.getProductHeader()).toBe('MacBook Pro');

});


test ('Verify product images count ',async ({homePage,searchResultsPage,productInfoPage}) =>

{

await homePage.doSearch('macbook');
await searchResultsPage.selectProduct('MacBook Pro');
expect (await productInfoPage.getProductImagesCount()).toBe(4);

});



test('verify the product info test',async ({homePage,searchResultsPage,productInfoPage}) =>

{

await homePage.doSearch('macbook');
await searchResultsPage.selectProduct('MacBook Pro');
let actualProductInfoMap =await productInfoPage.getProductInfo();
console.log('Actual Product Details :',actualProductInfoMap);

expect.soft(actualProductInfoMap.get('productHeader')).toBe('MacBook Pro');
expect.soft(actualProductInfoMap.get('productImagesCount')).toBe(4);
expect.soft(actualProductInfoMap.get('Brand')).toBe('Apple');
expect.soft(actualProductInfoMap.get('Product Code')).toBe('Product 18');
expect.soft(actualProductInfoMap.get('Reward Points')).toBe('800');
expect.soft(actualProductInfoMap.get('Availability')).toBe('Out Of Stock');
expect.soft(actualProductInfoMap.get('productPrice')).toBe('$2,000.00');
expect.soft(actualProductInfoMap.get('exTaxPrice')).toBe('$2,000.00');


});
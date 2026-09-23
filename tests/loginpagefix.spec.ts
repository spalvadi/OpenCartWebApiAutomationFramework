import { test,expect } from '../src/fixtures/pagefixtures';
import {CsvHelper} from '../src/utils/CsvHelper';
import {ExcelHelper} from '../src/utils/ExcelHelper';
import {JsonHelper} from '../src/utils/JsonHelper';



test.beforeEach(async ({loginPage}) =>
{

await loginPage.goToLoginPage();

})


test ('Login page title test',async ({loginPage}) => {
    
let pageTitle = await loginPage.getLoginPageTitle();
console.log('Login page title :',pageTitle);
expect(pageTitle).toBe('Account Login');

} );

test ('Forgot pwd link exist test ',async ({loginPage}) => {

expect(await loginPage.isForgottenPwdLinkExist()).toBeTruthy();

} );

test ('user is able to login to the application with valid credentials test ',async ({loginPage,homePage}) => {

    
await loginPage.doLogin(process.env.USERNAME,process.env.PASSWORD);
expect.soft(await homePage.isLogoutLinkExist()).toBeTruthy();
expect.soft(await homePage.getHomePageTitle()).toBe('My Account');

} );


// DO_1 read csv data directly from the CSV file and loop the test menthod row wise ....

let testCSVData=CsvHelper.readCsv('src/data/logindata.csv');
for (let row of testCSVData)
{


test (`login to the application with CSV invalid credentials test - ${row.username} - {row.password}`,async ({loginPage,homePage}) => {

await loginPage.doLogin(row.username,row.password);
expect(await loginPage.isInvalidLoginErrorDisplayed()).toBeTruthy();

} );

}

// DO_2 read csv data directly from the excel file and loop the test method row wise ....

let testExcelData=ExcelHelper.readExcel('src/data/opencarttestdata.xslx','login');
for (let row of testExcelData)
{


test (`login to the application with EXCEL invalid credentials test - ${row.username} - {row.password}`,async ({loginPage,homePage}) => {

await loginPage.doLogin(row.username,row.password);
expect(await loginPage.isInvalidLoginErrorDisplayed()).toBeTruthy();

} );

}

// DO_3 read data directly from the json file and loop the test method row wise ....

let testJsonData=JsonHelper.readJson('src/data/loginData.json');
for (let row of testJsonData)
{


test (`login to the application with Json invalid credentials test - ${row.username} - {row.password}`,async ({loginPage,homePage}) => {

await loginPage.doLogin(row.username,row.password);
expect(await loginPage.isInvalidLoginErrorDisplayed()).toBeTruthy();

} );

}


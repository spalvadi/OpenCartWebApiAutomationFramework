import {test,expect} from '../../src/fixtures/apifixtures';

let tokenId :string;

test.beforeEach('generate the token',async({request})=>
{
    let creds =
    {
    username:'admin',
    password:'password123'

    };
let authResponse= await request.post('https://restful-booker.herokuapp.com/auth',
    {

        headers :{'Content-Type': 'application/json'},
        data :creds
});

expect(authResponse.status()).toBe(200);

let jsonResponse = await authResponse.json();

console.log('Auth API Response :', jsonResponse);

tokenId = jsonResponse.token;
console.log('token --',tokenId);
})

test('booking with CRUD token',async({request}) =>{

    //create a new bookking :post ---no token needed

let bookingResponse=await request.post('https://restful-booker.herokuapp.com/booking',{
 headers :{'Content-Type': 'application/json'},
        data : {
        "firstname" : "Jim",
        "lastname" : "Brown",
        "totalprice" : 111,
        "depositpaid" : true,
        "bookingdates" : {
        "checkin" : "2018-01-01",
        "checkout" : "2019-01-01"
    },
        "additionalneeds" : "Breakfast"
}

});
        expect(bookingResponse.status()).toBe(200);
        let bookingJson=await bookingResponse.json();
        let bookingId =bookingJson.bookingid;
        console.log('booking id',bookingId);


        //web automation code 

        page.goto

//update a booking by bookingId : needs token 

let updatedResponse=await request.put(`https://restful-booker.herokuapp.com/booking/${bookingId}`,

{
    headers : { Cookie : `token =${tokenId}`},
    data : {
        "firstname" : "Jim",
        "lastname" : "Brown",
        "totalprice" : 131,
        "depositpaid" : true,
        "bookingdates" : {
        "checkin" : "2018-01-01",
        "checkout" : "2019-01-01"
    },
        "additionalneeds" : "lunch"

} 
});

expect (updatedResponse.status()).toBe(200);
expect ((await updatedResponse.json()).totalprice).toBe(131);
expect ((await updatedResponse.json()).additionalneeds).toBe('lunch');

//3 . delete the booking by bookingId //needs bookingId

let  deletedResponse=await request.delete(`https://restful-booker.herokuapp.com/booking/${bookingId}`,
    {
        headers :{Cookie: `token =${tokenId}`}

});

expect (deletedResponse.status()).toBe(201);

})

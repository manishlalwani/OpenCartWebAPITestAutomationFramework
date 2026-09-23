import { test, expect } from '../../src/fixtures/apifixtures';


let AUTH_HEADER: Record<string, string>;
let bookingId: number;
let tokenId: string;

test.beforeEach('generate token', async ({ apiHelper }) => {
    let creds = {
        username: 'admin',
        password: 'password123'
    }
    let authResponse = await apiHelper.post('/auth', creds);
    let jsonResponse = authResponse.body;
    tokenId = jsonResponse.token;
    console.log(tokenId);
    AUTH_HEADER = {
        Cookie: `token=${tokenId}`
    }
});

test.describe.serial('running e2e crud api test cases', () => {

    //GET Test 
    test('GET API - get all booking ids', async ({ apiHelper }) => {
        let response = await apiHelper.get('/booking');
        expect(response.status).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
    })

    ///POST 
    test('POST API - create a user', async ({ apiHelper }) => {
        let userData = {
            "firstname": "Jim Test",
            "lastname": "Brown Test ",
            "totalprice": 121,
            "depositpaid": true,
            "bookingdates": {
                "checkin": "2026-01-01",
                "checkout": "2027-01-01"
            },
            "additionalneeds": "Breakfast"
        };
        let response = await apiHelper.post('/booking', userData);
        expect(response.status).toBe(200);
        bookingId = response.body.bookingid;
    });


    //PUT 
    test('PUT API - update a user', async ({ apiHelper }) => {
        let userData = {
            "firstname": "Jim Test",
            "lastname": "Brown Test",
            "totalprice": 125,
            "depositpaid": true,
            "bookingdates": {
                "checkin": "2026-04-01",
                "checkout": "2027-04-01"
            },
            "additionalneeds": "Dinner"
        };
        let response = await apiHelper.put(`/booking/${bookingId}`, userData, AUTH_HEADER);
        expect(response.status).toBe(200);
        expect(response.body.totalprice).toBe(userData.totalprice);
        expect(response.body.additionalneeds).toBe(userData.additionalneeds);
    });

    //DELETE

    test('Delete API - delete a user', async ({ apiHelper }) => {

        let response = await apiHelper.delete(`/booking/${bookingId}`, AUTH_HEADER);
        expect(response.status).toBe(201);

    });

    // test('GET API - verify user is deleted or not', async ({ apiHelper }) => {
    //     let response = await apiHelper.get(`/booking/${bookingId}`);
    //     expect(response.status).toBe(200);
    //     //expect(response.body.message).toBe('Resource not found');
    // })


});
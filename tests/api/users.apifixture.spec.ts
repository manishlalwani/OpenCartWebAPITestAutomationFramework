import { test, expect } from '../../src/fixtures/apifixtures';

const TOKEN = process.env.API_TOKEN;

let AUTH_HEADER = {
    Authorization: `Bearer ${TOKEN}`
};

let userId: number;

test.describe.serial('running e2e crud api test cases', () => {

    //GET Test 
    test('@regression @smoke GET API - get all users', async ({ apiHelper }) => {
        let response = await apiHelper.get('/public/v2/users', AUTH_HEADER);
        expect(response.status).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
    })

    ///POST 
    test('@regression POST API - create a user', async ({ apiHelper }) => {
        let userData = {
            name: 'manish',
            email: `manishautomation_${Date.now()}@test.com`,
            gender: 'male',
            status: 'active'
        };
        let response = await apiHelper.post('/public/v2/users', userData, AUTH_HEADER);
        expect(response.status).toBe(201);
        userId = response.body.id;
    });


    ///PUT 
    test('@regression PUT API - update a user', async ({ apiHelper }) => {
        let userData = {
            name: 'manish automation test',
            status: 'inactive'
        };
        let response = await apiHelper.put(`/public/v2/users/${userId}`, userData, AUTH_HEADER);
        expect(response.status).toBe(200);
        expect(response.body.name).toBe(userData.name);
        expect(response.body.status).toBe(userData.status);
    });

    //DELETE

    test('Delete API - delete a user', async ({ apiHelper }) => {

        let response = await apiHelper.delete(`/public/v2/users/${userId}`, AUTH_HEADER);
        expect(response.status).toBe(204);

    });

    test('@regression GET API - verify user is deleted or not', async ({ apiHelper }) => {
        let response = await apiHelper.get(`/public/v2/users/${userId}`, AUTH_HEADER);
        expect(response.status).toBe(404);
        expect(response.body.message).toBe('Resource not found');
    })


});
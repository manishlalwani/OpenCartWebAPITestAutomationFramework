import { test, expect } from '../../src/fixtures/apifixtures';

const TOKEN = process.env.API_TOKEN;

let AUTH_HEADER = {
    Authorization: `Bearer ${TOKEN}`
};




//helper - generic function  to create a fresh user

async function createUser(apiHelper: any) {
    let userData = {
        name: 'apiautomation',
        email: `apiautomation_${Date.now()}@test.com`,
        gender: 'male',
        status: 'active'
    };
    let response = await apiHelper.post('/public/v2/users', userData, AUTH_HEADER);
    expect(response.status).toBe(201);
    return response.body;
}

//Test 1 - create a user and verify it via get 
// POST user -- > get id. --> GET Call using get id. --> 200
test('create a user test', async ({ apiHelper }) => {
    //create a fresh user
    let userResponse = await createUser(apiHelper);
    let getResponse = await apiHelper.get(`/public/v2/users/${userResponse.id}`, AUTH_HEADER);
    expect(getResponse.status).toBe(200);
    expect(getResponse.body.name).toBe('apiautomation');

});

//Test 2  - update the user = verify that : AAA
// POST --> userId --> get user/userId -- > PUT /userId --> get /userId
test('update a user test', async ({ apiHelper }) => {
    //1 .create a fresh user
    let userResponse = await createUser(apiHelper);

    //2. get a user
    let getResponse = await apiHelper.get(`/public/v2/users/${userResponse.id}`, AUTH_HEADER);
    expect(getResponse.status).toBe(200);
    expect(getResponse.body.name).toBe('apiautomation');


    // 3. update a user
    let userUpdatedData = {
        name: 'apiautomation-update',
        status: 'inactive'
    }

    let updatedResponse = await apiHelper.put(`/public/v2/users/${userResponse.id}`, userUpdatedData, AUTH_HEADER);
    expect(updatedResponse.status).toBe(200);
    expect.soft(updatedResponse.body.name).toBe(userUpdatedData.name);
    expect.soft(updatedResponse.body.status).toBe(userUpdatedData.status);

    //4. GET a user 
    getResponse = await apiHelper.get(`/public/v2/users/${userResponse.id}`, AUTH_HEADER);
    expect(getResponse.status).toBe(200);
    expect(getResponse.body.name).toBe(userUpdatedData.name);
    expect(getResponse.body.status).toBe(userUpdatedData.status);

});


//Delete a user

// create user - > get user -> delete user  -> get user

test('delete a user test', async ({ apiHelper }) => {
    //create a fresh user
    let userResponse = await createUser(apiHelper);
    
    //2. get a user
    let getResponse = await apiHelper.get(`/public/v2/users/${userResponse.id}`, AUTH_HEADER);
    expect(getResponse.status).toBe(200);
    expect(getResponse.body.name).toBe('apiautomation');

    //3. delete the user
    await apiHelper.delete(`/public/v2/users/${userResponse.id}`, AUTH_HEADER);
    expect(getResponse.status).toBe(200);

    //4.get a user

    getResponse = await apiHelper.get(`/public/v2/users/${userResponse.id}`, AUTH_HEADER);
    expect(getResponse.status).toBe(404);
    expect(getResponse.body.message).toBe('Resource not found');


});


//Test 4  - patch the user = verify that : AAA
// POST --> userId --> get user/userId -- > patch /userId --> get /userId
test('update a user specific test', async ({ apiHelper }) => {
    //1 .create a fresh user
    let userResponse = await createUser(apiHelper);

    //2. get a user
    let getResponse = await apiHelper.get(`/public/v2/users/${userResponse.id}`, AUTH_HEADER);
    expect(getResponse.status).toBe(200);
    expect(getResponse.body.name).toBe('apiautomation');


    // 3. update a user
    let userUpdatedData = {
        name: 'apiautomation-update-patch',
        status: 'inactive'
    }

    let updatedResponse = await apiHelper.patch(`/public/v2/users/${userResponse.id}`, userUpdatedData, AUTH_HEADER);
    expect(updatedResponse.status).toBe(200);
    expect.soft(updatedResponse.body.name).toBe(userUpdatedData.name);
    expect.soft(updatedResponse.body.status).toBe(userUpdatedData.status);

    //4. GET a user 
    getResponse = await apiHelper.get(`/public/v2/users/${userResponse.id}`, AUTH_HEADER);
    expect(getResponse.status).toBe(200);
    expect(getResponse.body.name).toBe(userUpdatedData.name);
    expect(getResponse.body.status).toBe(userUpdatedData.status);

});

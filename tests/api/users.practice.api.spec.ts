import { test, expect, request, APIResponse } from '@playwright/test';


let AUTH_TOKEN = {
    Authorization: 'Bearer 1d14cfb28e0f86940c2ae3600d42aef5b749a3a309e1e32fb77bfdd16c648657'
};


test.skip('get all user api test', async ({ request }) => {
    let response: APIResponse = await request.get('https://gorest.co.in/public/v2/users', {
        headers: AUTH_TOKEN
    });
    let jsonBody = await response.json();
    console.log(jsonBody);
    console.log(response.status());
    console.log(response.statusText());
    expect(response.status()).toBe(200);

});

test.skip('create an user POST api test', async ({ request }) => {
    //user javascript object
    let userData = {
        name: 'manish',
        email: 'manishautomation123@gmail.com',
        gender: 'male',
        status: 'active'
    };
    // JSON object can be passed directly to request

    let response: APIResponse = await request.post('https://gorest.co.in/public/v2/users', {
        headers: AUTH_TOKEN,
        data: userData
    });

    let jsonBody = await response.json();
    console.log(jsonBody);
    console.log(response.status());//201
    console.log(response.statusText());//Created
    expect(response.status()).toBe(201);

});

test.skip('update an user PUT api test', async ({ request }) => {
    //user javascript object
    let userData = {
        name: 'manish lalwani',
        email: 'manishautomation123@gmail.com',
        gender: 'female',
        status: 'inactive'
    };
    // JSON object can be passed directly to request

    let response: APIResponse = await request.put('https://gorest.co.in/public/v2/users/8616258', {
        headers: AUTH_TOKEN,
        data: userData
    });

    let jsonBody = await response.json();
    console.log(jsonBody);
    console.log(response.status());//200
    console.log(response.statusText());//Ok
    expect(response.status()).toBe(200);

});

test.skip('delete the user DELETE api test', async ({ request }) => {
    
    let response: APIResponse = await request.delete('https://gorest.co.in/public/v2/users/8616270', {
        headers: AUTH_TOKEN,
    });

    console.log(response.status());//204
    console.log(response.statusText());//No Content
    expect(response.status()).toBe(204);

});


///8616270
import { test, expect } from '../../src/fixtures/apifixtures';
import Ajv from 'ajv';
import fs from 'fs';


//schema. - type of response data
//ajv - node library  for the schema validation
//npm install ajv

const TOKEN = process.env.API_TOKEN;

let AUTH_HEADER = {
    Authorization: `Bearer ${TOKEN}`
};

//set up the AJV
let ajv = new Ajv();

//define the json schema

// let userSchema = {
//     "type": "object",
//     "properties": {
//         "id": {
//             "type": "number"
//         },
//         "name": {
//             "type": "string"
//         },
//         "email": {
//             "type": "string"
//         },
//         "gender": {
//             "type": "string"
//         },
//         "status": {
//             "type": "string"
//         }
//     },
//     "required": [
//         "id",
//         "name",
//         "email",
//         "gender",
//         "status"]
// };

let userArraySchema = {
    "type": "array",
    "items": JSON.parse(fs.readFileSync('../src/schema/userSchema.json','utf-8'))
};

//Test 1 - verify schema for single user response
// POST user -- > get id. --> GET Call using get id. --> 200
test('get a single user - schema test', async ({ apiHelper }) => {
    //create a fresh user
    let userData = {
        name: 'apiautomation',
        email: `apiautomation_${Date.now()}@test.com`,
        gender: 'male',
        status: 'active'
    };
    let userResponse = await apiHelper.post('/public/v2/users', userData, AUTH_HEADER);
    expect(userResponse.status).toBe(201);
    let userId = userResponse.body.id;

    //get a user
    let getUserResponse = await apiHelper.get(`/public/v2/users/${userId}`, AUTH_HEADER);
    expect(getUserResponse.status).toBe(200);

    //verify user schema

    let validate = ajv.compile(JSON.parse(fs.readFileSync('../src/schema/userSchema.json','utf-8')));
    let isScehmaValid = validate(getUserResponse.body)

    if (!isScehmaValid) {
        console.log("SCHEMA ERRORS: ", validate.errors);
    }

    expect(isScehmaValid).toBeTruthy();


});

//test - verify schema for get all users api
test('get all users - schema test', async ({ apiHelper }) => {

    //get all users
    let getUsersResponse = await apiHelper.get(`/public/v2/users`, AUTH_HEADER);
    expect(getUsersResponse.status).toBe(200);

    //verify users schema

    let validate = ajv.compile(userArraySchema);
    let isScehmaValid = validate(getUsersResponse.body)

    if (!isScehmaValid) {
        console.log("SCHEMA ERRORS: ", validate.errors);
    }

    expect(isScehmaValid).toBeTruthy();


});
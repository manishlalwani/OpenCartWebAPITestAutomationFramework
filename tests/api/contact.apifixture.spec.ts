import { test, expect } from '../../src/fixtures/apifixtures';

let token: string;
let creds: any;

test.beforeEach('Login user', async ({ apiHelper }) => {
    creds = {
        "email": "manishlalwani88@gmail.com",
        "password": "Mumbai@2029"
    }
    let authResponse = await apiHelper.post('/users/login', creds);
    token = authResponse.body.token;
});

test.skip('@regression add a contact ', async ({ apiHelper, page }) => {
    //create a contact using API
    test.setTimeout(60_000);
    let contactData = {
        "firstName": "Automation Testing",
        "lastName": "Manish",
        "birthdate": "1988-01-01",
        "email": "manishtesting@test.com",
        "phone": "8005555555",
        "street1": "1 Main St.",
        "street2": "Apartment A",
        "city": "Pune",
        "stateProvince": "MH",
        "postalCode": "411015",
        "country": "India"
    };
    let AUTH_HEADER = {
        Authorization: `Bearer ${token}`
    };
    let createResponse = await apiHelper.post('/contacts', contactData, AUTH_HEADER);
    expect(createResponse.status).toBe(201);
    let contactId = createResponse.body._id;
    console.log(contactId);

    // verify contact on UI using name

    await page.goto(`${process.env.API_BASE_URL!}`);
    let emailId = page.getByRole('textbox', { name: 'Email' });
    let password = page.getByRole('textbox', { name: 'Password' });
    let submitBtn = page.getByRole('button', { name: 'Submit' });

    await emailId.fill(creds.email);
    await password.fill(creds.password);
    await submitBtn.click();

    let headerTitle = page.getByRole('heading', { name: 'Contact List', level: 1 });
    expect(await headerTitle.textContent()).toBe('Contact List App');
    let name = `${contactData.firstName} ${contactData.lastName}`;
    let userRow = page.getByText(`${name}`, { exact: true });
    expect(userRow.isVisible).toBeTruthy();

    //Delete the user using API after verification 

    let deleteResponse = await apiHelper.delete(`/contacts/${contactId}`, AUTH_HEADER);
    expect(deleteResponse.status).toBe(200);

});

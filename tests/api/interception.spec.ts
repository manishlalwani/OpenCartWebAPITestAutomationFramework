
import { test, expect } from '@playwright/test';

//web app - intercept the network call and log them
//**/* --> wild card parameter for url

test('intercept and log the request', async ({ page }) => {
    await page.route('**/*', async (route) => {
        console.log(route.request().method(), route.request().url());
        await route.continue(); //url1 --> url 2 --> url3
    });
    //Now launch any web application 

    await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=common/home');
});

//intercept with mocking
//mocking - create a fake data /response


test('mock search data api - fake json', async ({ page }) => {

    //JS
    let fakeProducts = [
        { name: 'Fake Macbook Pro', price: '$200' },
        { name: 'Fake Iphone 18 Pro', price: '$300' },
        { name: 'Fake Samsung S25', price: '$400' },

    ];

    await page.route('**/index.php?route=product/search&search=macbook', async (route) => {
        await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify(fakeProducts)
        });
    });

    await page.goto('https://abc.com/index.php?route=product/search&search=macbook');

    await page.pause();
});


test('mock search data api - fake json status code 401', async ({ page }) => {

    //JS
    let fakeMessage = {
        message: 'You are not authorized'
    }

    await page.route('**/index.php?route=login', async (route) => {
        await route.fulfill({
            status: 401,
            contentType: 'application/json',
            body: JSON.stringify(fakeMessage)
        });
    });

    await page.goto('https://abc.com/index.php?route=login');

    await page.pause();
});

test('mock search data api -fake html', async ({ page }) => {

    const htmlBody = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Products</title>
        </head>

        <body>

            <h1>Product List</h1>

            <div class="product">
                <h2>Fake Macbook Pro</h2>
                <p>$200</p>
            </div>

            <div class="product">
                <h2>Fake Iphone 18 Pro</h2>
                <p>$300</p>
            </div>

            <div class="product">
                <h2>Fake Samsung S25</h2>
                <p>$400</p>
            </div>

        </body>
        </html>
    `;

    await page.route('**/index.php?route=product/search&search=macbook', async (route) => {
        await route.fulfill({
            status: 200,
            contentType: 'text/html',
            body: htmlBody
        });
    });

    await page.goto('https://abc.com/index.php?route=product/search&search=macbook');

    let heading = await page.textContent('h1');
    expect(heading).toBe('Product List');
});
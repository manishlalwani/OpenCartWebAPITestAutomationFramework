
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
    const response = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Unauthorized</title>
            <style>
                body {
                    font-family: Arial;
                    background: #f5f7fa;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                }

                .card {
                    background: white;
                    padding: 40px;
                    border-radius: 16px;
                    text-align: center;
                    box-shadow: 0 10px 30px rgba(0,0,0,.15);
                }

                .icon {
                    font-size: 50px;
                }

                h1 {
                    color: #d32f2f;
                }
            </style>
        </head>

        <body>
            <div class="card">
                <div class="icon">🔒</div>
                <h1>Access Denied</h1>
                <p>${fakeMessage.message}</p>
            </div>
        </body>
        </html>
    `;

    await page.route('**/index.php?route=login', async (route) => {
        await route.fulfill({
            status: 401,
            contentType: 'text/html',
            body: response
        });
    });

    await page.goto('https://abc.com/index.php?route=login');

    let message = page.getByRole('heading', { name: 'Access Denied' });


    expect(await message.isVisible()).toBeTruthy();
});

test('mock search data api - fake json status code 500', async ({ page }) => {

    //JS
    let fakeMessage = {
        message: 'Something went wrong on our server'
    }

    const htmlResponse = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Internal Server Error</title>

            <style>
                body {
                    font-family: Arial, sans-serif;
                    background: linear-gradient(135deg, #ff6b6b, #c0392b);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    margin: 0;
                }

                .card {
                    background: white;
                    padding: 45px;
                    border-radius: 20px;
                    text-align: center;
                    box-shadow: 0 15px 40px rgba(0,0,0,.2);
                }

                .icon {
                    font-size: 50px;
                }

                h1 {
                    color: #e53935;
                }

                p {
                    color: #666;
                    font-size: 17px;
                }
            </style>
        </head>

        <body>
            <div class="card">
                <div class="icon">⚠️</div>
                <h1>Internal Server Error</h1>
                <p>${fakeMessage.message}</p>
                <p><strong>HTTP Status: 500</strong></p>
            </div>
        </body>
        </html>
    `;

    await page.route('**/index.php?route=login', async (route) => {
        await route.fulfill({
            status: 501,
            contentType: 'text/html',
            body: htmlResponse
        });
    });

    await page.goto('https://abc.com/index.php?route=login');
    let message = page.getByRole('heading', { name: 'Internal Server Error' });
    expect(await message.isVisible()).toBeTruthy();
});

test('mock search data api -fake html', async ({ page }) => {

    const htmlBody = `
                    < !DOCTYPE html >
                        <html>
                        <head>
                        <title>Products </title>
                        </head>

                        < body >

                        <h1>Product List </h1>

                            < div class="product" >
                                <h2>Fake Macbook Pro </h2>
                                    < p > $200 </p>
                                    </div>

                                    < div class="product" >
                                        <h2>Fake Iphone 18 Pro </h2>
                                            < p > $300 </p>
                                            </div>

                                            < div class="product" >
                                                <h2>Fake Samsung S25 </h2>
                                                    < p > $400 </p>
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

    let products = await page.locator('.product h2').allTextContents();
    expect(products).toEqual(['Fake Macbook Pro', 'Fake Iphone 18 Pro', 'Fake Samsung S25']);

    let prices = await page.locator('.product p').allTextContents();
    expect(prices).toEqual(['$200', '$300', '$400']);
});
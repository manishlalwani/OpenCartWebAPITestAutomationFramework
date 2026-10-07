
import { test, expect } from '@playwright/test';

let OAUTH_CONFIG = {
    tokenURL: 'https://accounts.spotify.com/api/token',
    clientId: process.env.OAUTH_CLIENT_ID!,
    clientSecret: process.env.OAUTH_CLIENT_SECRET!,
    grantType: process.env.GRANT_TYPE!
}

let accessToken: string;

test.beforeEach('POST - generate the access token', async ({ request }) => {
    let response = await request.post(OAUTH_CONFIG.tokenURL, {
        form: {
            grant_type: OAUTH_CONFIG.grantType,
            client_id: OAUTH_CONFIG.clientId,
            client_secret: OAUTH_CONFIG.clientSecret
        }
    });
    expect(response.status()).toBe(200);
    let jsonResponse = await response.json();
    console.log(jsonResponse);
    accessToken = jsonResponse.access_token;
});

test('@smoke GET - albums data test', async ({ request }) => {
    let baseURL = 'https://api.spotify.com';
    let endPointURL = '/v1/albums/4aawyAB9vmqN3uQ7FjRGTy';
    let albumResponse = await request.get(`${baseURL}${endPointURL}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });

    expect(albumResponse.status()).toBe(200);
    let jsonBody = await albumResponse.json();
    expect(jsonBody.album_type).toBe('album');
    expect(jsonBody.total_tracks).toBe(18);
    expect(jsonBody.external_urls.spotify).toContain('https://open.spotify.com/album/4aawyAB9vmqN3uQ7FjRGTy');
    expect(jsonBody.images.length).toBe(3);
  
})
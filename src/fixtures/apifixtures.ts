import { APIRequestContext, test as baseTest, expect } from '@playwright/test';
import { ApiHelper } from '../api/ApiHelper';


//define the type of api fixtures: 

type ApiFixtures = {
    apiHelper: ApiHelper
}

export let test = baseTest.extend<ApiFixtures>({
    apiHelper: async ({ request }, use) => {
        let apiHelper = new ApiHelper(request, process.env.API_BASE_URL!);
        await use(apiHelper);
    }
})




export { expect } from '@playwright/test';
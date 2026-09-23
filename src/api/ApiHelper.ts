import { APIRequestContext } from "@playwright/test";

export class ApiHelper {
    private readonly request: APIRequestContext;
    private readonly baseURL: string;

    constructor(request: APIRequestContext, baseURL: string) {
        this.request = request;
        this.baseURL = baseURL;
    }

    //Helper methods

    //GET method
    async get(endPoint: string, headers?: Record<string, string>) {
        let response = await this.request.get(`${this.baseURL}${endPoint}`, {
            headers: headers
        });
        console.log(await response.json(), response.status());
        return {
            status: response.status(),
            body: await response.json()
        }
    }

    //POST method

    async post(endPoint: string, data: object, headers?: Record<string, string>) {
        let response = await this.request.post(`${this.baseURL}${endPoint}`, {
            data: data,
            headers: headers
        });
        console.log(await response.json(), response.status());
        return {
            status: response.status(),
            body: await response.json()
        }
    }

    //delete method

    async delete(endPoint: string, headers?: Record<string, string>) {
        let response = await this.request.delete(`${this.baseURL}${endPoint}`, {
            headers: headers
        });
        return {
            status: response.status(),
        }
    }

    //put call
    async put(endPoint: string, data: object, headers?: Record<string, string>) {
        let response = await this.request.put(`${this.baseURL}${endPoint}`, {
            data: data,
            headers: headers
        });
        console.log(await response.json(), response.status());
        return {
            status: response.status(),
            body: await response.json()
        }
    }

    //patch call
    async patch(endPoint: string, data: object, headers?: Record<string, string>) {
        let response = await this.request.patch(`${this.baseURL}${endPoint}`, {
            data: data,
            headers: headers
        });
        console.log(await response.json(), response.status());
        return {
            status: response.status(),
            body: await response.json()
        }
    }
}
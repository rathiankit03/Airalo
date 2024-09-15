import * as apiDetails from '@apiDetails/apiDetails.json';
import { request, expect } from '@playwright/test'

export default class ApiRequest {

    async getRequestAccessToken() {
        const apiContext = await request.newContext({
            baseURL: apiDetails.baseURI,
            extraHTTPHeaders: {
                'Accept': 'application/json'
            },
        });

        const accessTokenEndpoint = apiDetails.accessTokenEndpoint;
        const response = await apiContext.post(accessTokenEndpoint, {
            form: {
                "client_id" : await apiDetails.client_id,
                "client_secret": await apiDetails.client_secret,
                "grant_type": await apiDetails.grant_type
            },
            headers: {
                "Accept": "application/json"
            }
        })
        expect(await response.status(), 'Status code to request access token should be 200').toBe(200);
        const responseBody = JSON.parse(await response.text());
        return responseBody.data.access_token;
    }

    async getResponseFromSubmitOrdersAPI( auth:string, quantity: number, package_id: string ) {
        const apiContext = await request.newContext({
            baseURL: apiDetails.baseURI,
            extraHTTPHeaders: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${auth}`
            },
        });

        const submitOrdersEndpoint = apiDetails.submitOrderEndPoint;
        const response = await apiContext.post(submitOrdersEndpoint, {
            form: {
                "quantity" : await quantity,
                "package_id": await package_id
            }
        })
        return response;
    }

    async getEsimsList(auth:string, limit:number) {
        const apiContext = await request.newContext({
            baseURL: apiDetails.baseURI,
            extraHTTPHeaders: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${auth}`
            },
        });

        const getEsimsListEndpoint = apiDetails.getEsimsListEndpoint;
        const response = await apiContext.get(getEsimsListEndpoint, {
            params: {
                'limit': limit
            }
        })
        return response;
    }
}
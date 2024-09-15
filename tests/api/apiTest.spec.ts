import {test, expect} from "@playwright/test";
import ApiRequest from '@utils/api/apiRequest';

test('To Validate if order is submited from Submit Order endpoint then it can be retrived from Get eSims List API @regression @api', async () => {

    const apiRequest = new ApiRequest();
    const quantityOfOrders: number = 6;
    const package_id: string = 'merhaba-7days-1gb';
    let authToken;
    let submittedOrderIDs: number[];
    let eSimsIDs: number[];

    await test.step('Get Auth Token from Request Access Token API', async() => {
        authToken = await apiRequest.getRequestAccessToken();    
    });

    await test.step('Submit orders, validate response from Submit Order API and store submitted Order IDs', async() => {
        let responseFromSubmitOrderApi = await apiRequest.getResponseFromSubmitOrdersAPI(authToken, quantityOfOrders, package_id);
        expect(await responseFromSubmitOrderApi.status(), 'Submit Orders API shoule send back response with 200 status code').toBe(200);
        const responseBodyFromSubmitOrderApi  = JSON.parse(await responseFromSubmitOrderApi.text());
        await expect(responseBodyFromSubmitOrderApi.data.quantity, 'Quantity of orders should be ' + quantityOfOrders).toBe(quantityOfOrders);
        await expect(responseBodyFromSubmitOrderApi.data.package_id, 'Package ID should be ' + package_id).toBe(package_id);
        await expect(responseBodyFromSubmitOrderApi.data.data, 'Data should be 1 GB').toBe('1 GB');
        await expect(responseBodyFromSubmitOrderApi.data.price, 'Price should be $4.5').toBe(4.5); 
        submittedOrderIDs = await responseBodyFromSubmitOrderApi.data.sims.map(sim => sim.id);
        await expect(submittedOrderIDs.length, 'Quantity of submit order IDs should be ' + quantityOfOrders).toBe(quantityOfOrders);
    });

    await test.step('Get eSims List, validate response and store eSims ID received from get eSims List', async() => {
        let responseFromGetEsimsList = await apiRequest.getEsimsList(authToken, quantityOfOrders);
        expect(await responseFromGetEsimsList.status(), 'Get eSims List API should send back response with 200 status code').toBe(200);
        const responseBodyFromGetEsimsList  = JSON.parse(await responseFromGetEsimsList.text());
        eSimsIDs = await responseBodyFromGetEsimsList.data.map(data => data.id).sort((a, b) => a - b);
        await expect(eSimsIDs.length, 'Quantity of eSims IDs should be ' + quantityOfOrders).toBe(quantityOfOrders);
    })

    await test.step('Validate if submited order ids are equal to eSims IDs', async() => {
        await expect(eSimsIDs, 'eSims IDs should be equal to Submited Order IDs').toEqual(submittedOrderIDs);
    })
  });
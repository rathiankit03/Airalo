import {test, expect} from "@playwright/test";
import {navigateToHomePage} from '@utils/common/navigationUtils';
import HomePageComponent from '@pageFactory/components/homePage.component';
import LocalEsimPageComponent from '@pageFactory/components/localesimPage.component';
import ProductComponent from '@pageFactory/components/productPage.component';

test('To validate first esim plan of Japan @regression @japan @ui', async ({ page }) => {
    const homePageComponent = new HomePageComponent(page);
    const localEsimPageComponent = new LocalEsimPageComponent(page);
    const productComponent = new ProductComponent(page);

    await test.step('Navigation to Home page', async() => {
        await navigateToHomePage(page);
        await homePageComponent.handleCookiePopup();
        await homePageComponent.handlePushNotificationAlertPopup();
    });

    await test.step('Search for Japan and select Local option', async() => {
        await homePageComponent.getSearchBar().fill('Japan');
        await homePageComponent.waitForSearchSuggestion();
        await homePageComponent.getJapanOptionFromSearchSuggetion().click();
        
    });

    await test.step('Select first eSim Package', async() => {
        await localEsimPageComponent.getFirstBuyNowButton().click();
    });

    await test.step('Verify Package Details', async() => {
        await expect(productComponent.getTitleOfProduct(), "Title should be Moshi Moshi").toHaveText('Moshi Moshi');
        await expect(productComponent.getCoverageValue(), 'Coverage should be Japan').toHaveText('Japan');
        await expect(productComponent.getDataValue(), 'Data value should be 1 GB').toHaveText('1 GB');
        await expect((await productComponent.getValidityValue().textContent()).trim(), 'Validity value should be 7 days').toBe('7 Days');
        await expect((await productComponent.getPriceValue().textContent()).trim(), 'Price should be $4.50').toBe('4.50 €');
    })

  });
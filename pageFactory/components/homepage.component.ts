import { Locator, Page } from "@playwright/test";
import * as selectors from '@locators/homepage.locator.json'

export default class HomePage {
    
    constructor(private page: Page) {}

    getSearchBar(): Locator {
        return this.page.getByTestId(selectors.searchBar);
    }

    getLocalEsimOptionFromSearchBar(): Locator {
        return this.page.getByTestId(selectors["local-esim-tab-searchbar"]);
    }

    getCookiePopup(): Locator {
        return this.page.locator(selectors.cookiePopup);
    }

    getAcceptButtonOnCookiePopup(): Locator {
        return this.page.locator(selectors.acceptButtonOnCookiePopup);
    }

    async clickAcceptButtonOnCookiePopup() {
        await this.getAcceptButtonOnCookiePopup().click();
    }

    getPushNotificationAlertPopup(): Locator {
        return this.page.locator(selectors.pushNotificationAlert);
    }

    getPushNotificationAlertPopupAllowButton(): Locator {
        return this.page.locator(selectors.pushNotificationAlertAllowButton);
    }

    async clickAllowButtonOnPushNotificationAlertPopup() {
        await this.getPushNotificationAlertPopupAllowButton().click();
    }

    async waitForSearchSuggestion() {
        await this.page.waitForSelector(selectors.searchSuggetion, { state: 'visible' });
    }
    
    getJapanOptionFromSearchSuggetion() {
        return this.page.locator(selectors.japanOption);
    }

    async handleCookiePopup() {
        try {
            if (this.getCookiePopup().isVisible()) {
                await this.clickAcceptButtonOnCookiePopup();
            }
        } catch (error) {
            console.error('Exception occured: ' + error);
            throw error('Exception occured: ' + error);
        }
    }

    async handlePushNotificationAlertPopup() {
        try {
            if (this.getPushNotificationAlertPopup().isVisible()) {
                await this.clickAllowButtonOnPushNotificationAlertPopup();
            }
        } catch (error) {
            console.error('Exception occured: ' + error);
            throw error('Exception occured: ' + error);
        }
    }
}
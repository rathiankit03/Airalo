import { Locator, Page } from "@playwright/test";
import * as selectors from '@locators/localesimPage.locator.json'

export default class LocalEsimPage {
    
    constructor(private page: Page) {}

    getFirstBuyNowButton(): Locator {
        return this.page.getByTestId(selectors.buyNowButton).first();
    }
}
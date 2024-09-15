import { Locator, Page } from "@playwright/test";
import * as selectors from '@locators/product.locator.json'

export default class Product {
    
    constructor(private page: Page) {}

    getTitleOfProduct(): Locator {
        return this.page.getByTestId(selectors.title);
    }

    getCoverageValue(): Locator {
        return this.page.getByTestId(selectors.coverageValue).first();
    }

    getDataValue(): Locator {
        return this.page.getByTestId(selectors.dataValue).first();
    }

    getValidityValue(): Locator {
        return this.page.getByTestId(selectors.validatyValue).first();
    }

    getPriceValue(): Locator {
        return this.page.getByTestId(selectors.priceValue).first();
    }
}
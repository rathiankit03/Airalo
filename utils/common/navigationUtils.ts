import { Page } from "@playwright/test";

export async function navigateToHomePage(
    page: Page,
) {
    await page.goto("https://www.airalo.com/");
}

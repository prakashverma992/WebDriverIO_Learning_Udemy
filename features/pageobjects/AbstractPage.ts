import { browser, expect } from "@wdio/globals";

import assert from 'assert';

export default class AbstractPage {

    public async visit(url: string) {
        await browser.navigateTo(url);
        await browser.maximizeWindow();
    }

    public async waitForSeconds(seconds: int) {
        await browser.pause(seconds * 1000);
    }

    public async assertStringContainingValue(selector: string, value: string) {
        await expect(selector).toHaveText(expect.stringContaining(value));
    }

    public async assertStrings(actual: string, expected: string) {
        await expect(actual).toContain(expected);
    }

}

import { browser, $ } from '@wdio/globals'

import AbstractPage from './AbstractPage';
import Location from '../pageobjects/components/Location';
import SearchProduct from '../pageobjects/components/SearchProduct';

class HomePage extends AbstractPage {

    public get cookiePreference() {
        return $('#sp-cc-accept')
    }

    public get sortBySelectBox() {
        return $('#s-result-sort-select')
    }

    public get resultsPageValidation() {
        return $('h2[class="a-size-medium-plus a-spacing-none a-color-base a-text-bold"]')
    }

    public get allResults() {
        return $$('.a-section .aok-relative .s-image-square-aspect')
    }

    public async acceptCookie() {
        let exists = await this.cookiePreference.isExisting()

        if (!exists) {
            console.log('cookie preference is absent')
            await SearchProduct.searchClick()
        }
        else {
            await this.cookiePreference.waitForDisplayed()
            await this.cookiePreference.click()
        }

    }

    public async sortResultsByText(visibleSortType: string) {
        await this.sortBySelectBox.selectByVisibleText(visibleSortType)
    }

    public async assertResults() {
        await Location.assertStringContainingValue(this.resultsPageValidation, 'Results')
    }

    public async selectProducts(selectProductNumber: int) {
        const product = await this.allResults[selectProductNumber]
        await product.moveTo()
        await product.click()
    }

}

export default new HomePage();
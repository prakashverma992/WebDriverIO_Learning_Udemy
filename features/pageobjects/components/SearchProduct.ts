import { browser, $ } from '@wdio/globals'

import AbstractPage from '../AbstractPage';
import HomePage from '../HomePage';

class SearchProduct extends AbstractPage {

    public get searchBox() {
        return $('#twotabsearchtextbox')
    }

    public async searchProduct(product: string) {
        await this.searchBox.setValue(product)
        await browser.keys('Enter')
    }

    public async searchClick() {
        await this.searchBox.click()
    }

}

export default new SearchProduct();

import { browser, $ } from '@wdio/globals'

import AbstractPage from './AbstractPage';
import HomePage from './HomePage';

// Add products and their quantity to basket
class AddProductToBasketPage extends AbstractPage {

    public get productTitle() {
        return $('#productTitle')
    }

    public get increaseQuantity() {
        return $$('#quantity')[0]
    }

    public get addInBasket() {
        return $('#add-to-cart-button')
    }

    public async getProductTitle(): string {
        const titleProduct: string = await this.productTitle.getText()
        console.log('Product Title : ' + titleProduct)
        return titleProduct;
    }

    public async increaseProductQuantity(quantity) {
        await this.increaseQuantity.selectByAttribute('value', quantity)
        await $('#quantity_' + (quantity - 1)).click()
    }

    public async addToBasket() {
        await this.addInBasket.waitForClickable()
        await this.addInBasket.click()
    }

}

export default new AddProductToBasketPage();

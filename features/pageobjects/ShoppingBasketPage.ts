import { $ } from '@wdio/globals'

import AbstractPage from './AbstractPage';
import HomePage from './HomePage';

// Cart page
class ShoppingBasketPage extends AbstractPage {

    public get verifyProduct() {
        return $('div[data-csa-c-owner="CartX"]')
    }

    public get productTitleInCart() {
        return $('.sc-grid-item-product-title .a-truncate')
    }

    public async verifyProductQuantity(quantity: string) {
        const basketQuantity: string = await this.verifyProduct.getAttribute('data-quantity')
        await HomePage.assertStrings(basketQuantity, quantity)
    }

    public async verifyProductTitle(): string {
        const title: string = await this.productTitleInCart.getText()
        return title;
    }

}

export default new ShoppingBasketPage();

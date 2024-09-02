import { $ } from '@wdio/globals'

import AbstractPage from './AbstractPage';
import HomePage from './HomePage';

// Added products to basket confirmation
class AddedToBasketConfirmation extends AbstractPage {

    public get productAddedMessage() {
        return $('#NATC_SMART_WAGON_CONF_MSG_SUCCESS h1')
    }

    public get goToCart() {
        return $('#sw-gtc a')
    }

    public async productAddedToBaskeValidation(messageConfirmation: string) {
        await this.productAddedMessage.waitForDisplayed()
        await HomePage.assertStringContainingValue(this.productAddedMessage, messageConfirmation)

    }

    public async goToBasket() {
        await this.goToCart.waitForClickable()
        await this.goToCart.click()
    }

}

export default new AddedToBasketConfirmation();

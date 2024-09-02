import { browser, $ } from '@wdio/globals'

import AbstractPage from '../AbstractPage';
import HomePage from '../HomePage';
import SearchProduct from './SearchProduct';

class Location extends AbstractPage {

    public get setDeliveryLocation() {
        return $('#glow-ingress-line2')
    }

    public get setLocationPopUp() {
        return $('.a-popover-wrapper')
    }

    public get updatePostCode() {
        return $('#GLUXZipUpdateInput')
    }

    public get applyLocation() {
        return $('span[data-action="GLUXPostalUpdateAction"]')
    }

    public get locationUpdatedPopUpConfirmation() {
        return $('#GLUXHiddenSuccessSelectedAddressPlaceholder')
    }

    public get popUp() {
        return $('h4.a-popover-header-content')
    }

    public get continueToWebsite() {
        return $$('#GLUXConfirmClose')[1]
    }

    public async setLocation(postCode: string) {
        await this.setDeliveryLocation.waitForDisplayed()
        await this.setDeliveryLocation.click()
        await this.updatePostCode.waitForDisplayed()
        await this.updatePostCode.setValue(postCode)
        await this.applyLocation.click()
    }

    public async locationUpdatedPopUp(postCode: string) {
        await HomePage.waitForSeconds(4)
        let exists = await this.popUp.isExisting()
        console.log('is Exists : ' + exists)

        if (!exists) {
            console.log('Pop up not present')
            await SearchProduct.searchBox.waitForDisplayed()
            await SearchProduct.searchClick()
        } else {
            await HomePage.assertStringContainingValue(this.locationUpdatedPopUpConfirmation, postCode)
            await this.continueToWebsite.click()
        }

    }

    public async assertLocationUpdated(location: string) {
        await HomePage.assertStringContainingValue(this.setDeliveryLocation, location)
    }

}

export default new Location();

import { defineStep } from '@wdio/cucumber-framework';

import HomePage from '../pageobjects/HomePage';
import Location from '../pageobjects/components/Location';
import SearchProduct from '../pageobjects/components/SearchProduct';
import AddProductToBasketPage from '../pageobjects/AddProductToBasketPage';
import AddedToBasketConfirmation from '../pageobjects/AddedToBasketConfirmation';
import ShoppingBasketPage from '../pageobjects/ShoppingBasketPage';

var productTitle: string;
var basketProductTitle: string;

defineStep(/^User navigates on url "([^"]*)"$/, async (url: string) => {
    await HomePage.visit(url)
    await HomePage.acceptCookie()
})

defineStep(/^User sets the delivery location as "([^"]*)"$/, async (zipCode: string) => {
    await Location.setLocation(zipCode)
})

defineStep(/^User gets a pop up confirmation for location updated as "([^"]*)" only first time$/, async (zipCode: string) => {
    await Location.locationUpdatedPopUp(zipCode)
})

defineStep(/^User verifies the selected location on Home page as "([^"]*)"$/, async (location: string) => {
    await Location.assertLocationUpdated(location)
})

defineStep(/^User searches a product "([^"]*)" in the search bar on the Home page$/, async (searchProduct: string) => {
    await SearchProduct.searchProduct(searchProduct)
})

defineStep(/^User is able to see the results for the searched product$/, async () => {
    await HomePage.assertResults()
})

defineStep(/^User selects the "([^"]*)" to sort the results$/, async (sortType: string) => {
    await HomePage.sortResultsByText(sortType)
})

defineStep(/^User selects product "([^"]*)" from TOP five visible products in results$/, async (productNumber: int) => {
    await HomePage.selectProducts(productNumber)
    productTitle = await AddProductToBasketPage.getProductTitle()
})

defineStep(/^User increases the quantity by "([^"]*)" and adds them in the basket$/, async (productQuantity: int) => {
    await AddProductToBasketPage.increaseProductQuantity(productQuantity)
    await AddProductToBasketPage.addToBasket()
})

defineStep(/^User is able to see the confirmation message "([^"]*)"$/, async (confirmationMessage: string) => {
    await AddedToBasketConfirmation.productAddedToBaskeValidation(confirmationMessage)
})

defineStep(/^User checks out to the basket$/, async () => {
    await AddedToBasketConfirmation.goToBasket()
})

defineStep(/^User verifies the added product and the quantity as "([^"]*)" in the basket$/, async (productQuantity: string) => {
    await ShoppingBasketPage.verifyProductQuantity(productQuantity)
    basketProductTitle = await ShoppingBasketPage.verifyProductTitle()

    await HomePage.assertStrings(productTitle, basketProductTitle)

    console.log('productTitle : ' + productTitle)
    console.log('basketProductTitle : ' + basketProductTitle)
})

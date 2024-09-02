Feature: Search productsAmazon website United Kingdom

  Scenario Outline: User should be able to add product in the basket
    Given User navigates on url "https://www.amazon.co.uk"
    When User sets the delivery location as "<postCode>"
    Then User gets a pop up confirmation for location updated as "<postCode>" only first time
    And User verifies the selected location on Home page as "<location>"
    When User searches a product "<searchProduct>" in the search bar on the Home page
    Then User is able to see the results for the searched product
    When User selects the "<sortType>" to sort the results
    Then User is able to see the results for the searched product
    When User selects product "<productNumber>" from TOP five visible products in results
    And User increases the quantity by "<productQuantity>" and adds them in the basket
    Then User is able to see the confirmation message "Added to Basket"
    When User checks out to the basket
    Then User verifies the added product and the quantity as "<productQuantity>" in the basket

    Examples:
      | postCode | location | searchProduct  | sortType             | productNumber | productQuantity |
      | EC1M 5RR | London   | amazon voucher | Avg. Customer review |             1 |               2 |
      | SW11 7US | London   | gift card      | Price: High to low   |             4 |               1 |


![GitHub Logo](/assets/logo_Orlando_informer.png)




# Orlando Informers OT-Tickets API designed for use with SmartOrder


### General Information

This API was developed by Orlando Informer with Node, Typescript and Express among other technologies. It is designed to work with a UO API with endpoints outlined in [this Swagger document](https://qacorpapi.ucdp.net/smartorder/help/index.html#/).

### Getting Started

This repository **does not** include node_modules, so will want to install the required NPM packages by running the following command:

`npm i --save`

To start the server locally (on port 5000, by default), run the following command:

`npm run dev`

### Endpoints

* ***GET** /validate-token

    This endpoint returns a boolean indicating whether the token (passed is as a query parameter) is valid.

* **GET** /info

    This endpoint returns general information about the API such as version and available endpoints

* **GET** /product-catalog

    This endpoint fetches a product catalog based on criteria (***passed in as a query parameter***). Valid query parameters are as follows:

    **startDateInclusive**: 
        Date to retrive packages from (mm-dd-yyyy). Includes the date provided. <br>
    **endDateInclusive**:
        Date to retrieve packages through (mm-dd-yyyy). Includes the date provided. If dates are not provided, results are returned for 30 days from the current date.<br>
    **calculateDailyPrice**:
        (***Optional***) default is set to `true`. If set to false, date-based products will not be calculated in the returned data.<br>
    **retrieveOnly**:
        (***Optional***) Set to "current" for current-only, and "future" for future-only data.<br>
    **pricing**:
        (***Optional***) Set to "base" for base pricing only, and "discounted" for discounted pricing only. Both base and data are returned by default.
    **specificSalesProgramId**:
        (***Optional***) The specific SalesProgram to query (Optional; If not provided, all SalesProgram data is returned)
    **changesSince**:
        (***Optional***) Set to a date/time to retrieve data with changes since your specified date/time.

* **POST** /place-order

    This endpoint takes an order (***passed into the request body***) and places is. A successful request returns a response code of 201.
    The order object should have the following properties:<br/>
    **externalOrderId**: *String*<br/>

    **orderSalesProgramId**: *Number* <br/>

    **deliveryMethodId**: *Number* Optional <br/>

    **firstName**: *String* Purchaser's first name<br/>

    **lastName**: *String* Purchaser's last name<br/>

    **street1**: *String* house number and street adress<br/>

    **street2**: *String* (Optional) apartment, suite, unit or other applicable address information<br/>

    **city**: *String* Purchaser's city of residence<br/>

    **state**: *String* Purchaser's state of residence<br/>

    **zipCode**: *String* Purchaser's postal code<br/>

    **phone** *String*<br/>

    **email**: *String*<br/>

    **smartOrderLines**: *Array* An object array of date-based packages that are to be purchased. Each object in the array should have the following properties:

    **pluSalesProgramId**: *Number*<br/>

            **plu**: *String*<br/>
            
            **quantity**: *Number*<br/>

            **byTicketGuestNames**: *Array* An object array of the name(s) of guest(s) for this particular item. Each object in the array should have the following properties:

                first: String
                last: String

* **GET** /get-orders

    This endpoint returns orders. A successful request returns an array of orders and a response code on 200.

* ***GET** /get-orders/{order-ID}

    This endpoint returns data for the particular order corresponding to the order ID passed in.

* **GET** /info

    This endpoint returns general (***static***) information about the OI-Tickets application. In addition to providing general information, this is also an ideal endpoint to hit to ensure that the OI-Tickets application is up and running.
 

* **GET** /cancel-order

    This endpoint submits an order id (***passed in as a query parameter***) to the SmartOrder method to cancel orders.


    



<br/><br/><br/>



Additional questions and/or comments should be directed toward <contact@orlandoinformer.com>
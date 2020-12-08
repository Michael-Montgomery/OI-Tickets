import * as express from 'express';
import * as moment from "moment";
import axios from 'axios';
import { SettingsModule } from "../utils/settings";

const settings = new SettingsModule();

const markupRate = settings.markupRate;

export class ProductCatalogController {
    public router = express.Router();

    constructor() {
        this.intializeRoutes();
    }

    public intializeRoutes() {
        this.router.get('/get-product-catalog', this.getProductCatalog);
    }

    getProductCatalog = async (request: express.Request, response: express.Response) => {

        // token logic
        let token: string;

        const reqQueries = request.query;
        let queries = [];

        // If startDateInclusive and endDateInclusive aren't passed in set them to today and a month from now.

        if (reqQueries['startDateInclusive'] == undefined || reqQueries['endDateInclusive'] === undefined) {
            reqQueries['startDateInclusive'] = moment().format("MM-DD-YYYY");
            reqQueries['endDateInclusive'] = moment().add(30, 'days').format("MM-DD-YYYY")
        }

        // Join queries together 

        for (const property in request.query) {
            queries.push(`&${property}=${request.query[property]}`);
        }

        token = reqQueries['token']
        let joinedQueries = queries.join('');

        const fakeURL = 'http:www.boredpanda.com' // removed for security purposes

        axios.get(`${fakeURL}${joinedQueries}`, { 'headers': { 'Authorization': `Bearer ${token}` } })
            .then(function (res) {

                const markupRate: number = settings.markupRate
                let fedTax:number = settings.fedTaxRate
                
                let stateTax:number = settings.stateTaxRate
                
                let copiedResponse = res.data;
                let PLUArray = copiedResponse['catalogBySalesProgram'][0]['productCatalogEntries']

                for (let i = 0; i < PLUArray.length; i++) {
                    // update discountedPricing
                    let markedUp = PLUArray[i]['currentPricing']['basePriceData']['singlePriceWithTaxResponse']['price'] * markupRate;

                    let priceAsNumber = Number(PLUArray[i]['currentPricing']['basePriceData']['singlePriceWithTaxResponse']['price']) + markedUp

                    PLUArray[i]['currentPricing']['basePriceData']['singlePriceWithTaxResponse']['price'] = priceAsNumber.toFixed(2);
                    // make a number
                    PLUArray[i]['currentPricing']['basePriceData']['singlePriceWithTaxResponse']['price'] = Number(PLUArray[i]['currentPricing']['basePriceData']['singlePriceWithTaxResponse']['price'])

                    let fedMarkupTax = markedUp * fedTax;


                    let tax1Calc = markedUp * fedTax

                    let tax1AsNumber = Number(PLUArray[i]['currentPricing']['basePriceData']['singlePriceWithTaxResponse']['tax1']) + tax1Calc

                    PLUArray[i]['currentPricing']['basePriceData']['singlePriceWithTaxResponse']['tax1'] = tax1AsNumber.toFixed(2);
                    // make a number
                    PLUArray[i]['currentPricing']['basePriceData']['singlePriceWithTaxResponse']['tax1'] = Number(PLUArray[i]['currentPricing']['basePriceData']['singlePriceWithTaxResponse']['tax1'])   
                    
                    let stateMarkupTax = markedUp * stateTax;

                    let tax2AsNumber = Number(PLUArray[i]['currentPricing']['basePriceData']['singlePriceWithTaxResponse']['tax2']) + stateMarkupTax;

                    PLUArray[i]['currentPricing']['basePriceData']['singlePriceWithTaxResponse']['tax2'] = tax2AsNumber.toFixed(2);
                    // make a number
                    PLUArray[i]['currentPricing']['basePriceData']['singlePriceWithTaxResponse']['tax2'] = Number(PLUArray[i]['currentPricing']['basePriceData']['singlePriceWithTaxResponse']['tax2'])

                    let adjustedTotal = markedUp + fedMarkupTax + stateMarkupTax;

                    let totalAsNumber = Number(PLUArray[i]['currentPricing']['basePriceData']['singlePriceWithTaxResponse']['totalPriceWithTax']) + adjustedTotal;

                    PLUArray[i]['currentPricing']['basePriceData']['singlePriceWithTaxResponse']['totalPriceWithTax'] = totalAsNumber.toFixed(2);

                    PLUArray[i]['currentPricing']['basePriceData']['singlePriceWithTaxResponse']['totalPriceWithTax'] = Number(PLUArray[i]['currentPricing']['basePriceData']['singlePriceWithTaxResponse']['totalPriceWithTax'])
                    
                    PLUArray[i]['OIFinancials'] = {
                        markupRate: Number(markupRate.toFixed(2)),
                        oiMarkup: Number(markedUp.toFixed(2)),
                        oiFed: Number(fedMarkupTax.toFixed(2)),
                        oiState: Number(stateMarkupTax.toFixed(2))
                    }
                }
                response.send(copiedResponse);
            })
            .catch(function (error) {
                response.send(error);
            })
    }
}

import * as express from 'express';
import axios from 'axios';

export class ValidateTokenController {
    public router = express.Router();

    constructor() {
        this.intializeRoutes();
    }

    public intializeRoutes() {
        this.router.get('/validate-token', this.getProductCatalog);
    }

    getProductCatalog = async (request: express.Request, response: express.Response) => {

        // token logic
        let token: string = request.query["token"];

        axios.get(`https://qacorpapi.ucdp.net/smartorder/TestAuthorized`, { 'headers': { 'Authorization': `Bearer ${token}` } })
            .then(function (res) {
                response.send(true)
            })
            .catch(function (error) {
                response.send(false);
            })
    }
}

import * as express from 'express';
import axios from "axios";

export class CancelOrderController {
    public path = '/cancel-order';
    public router = express.Router();

    constructor() {
        this.intializeRoutes();
    }

    public intializeRoutes() {
        this.router.get('/cancel-order/:orderId', this.cancelOrder);
    }

    cancelOrder = async (request: express.Request, response: express.Response) => {
        let token: string = request.query['token'];

        let fakeURL = 'http://www.boredpanda.com'; //removed for security purposes

        axios.get(`${fakeURL}?ExternalOrderId=${request.params['orderId']}`, { 'headers': { 'Authorization': `Bearer ${token}` } })
            .then(function (res) {
                response.send(res.data)
            })
            .catch(function (error) {
                response.send(error);
            })
    }
}

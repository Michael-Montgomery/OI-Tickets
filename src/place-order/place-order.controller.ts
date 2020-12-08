import * as express from 'express';
import axios from 'axios';

export class PlaceOrderController {
    public path = '/place-order';
    public router = express.Router();

    constructor() {
        this.intializeRoutes();
    }

    public intializeRoutes() {
        this.router.post('/place-order/', this.placeOrder);
    }

    placeOrder = async (request: express.Request, response: express.Response) => {
        // assign token
        let token: string = request.query["token"];

        // place order 

            const reqBody = request.body;

            let newOrder = {
                externalOrderId: reqBody['externalOrderId'],
                orderSalesProgramId: reqBody['orderSalesProgramId'], 
                deliveryMethodId: 92,
                firstName: reqBody['firstName'],
                lastName: reqBody['lastName'],
                street1: reqBody['street1'],
                street2: reqBody['street2'],
                city: reqBody['city'],
                state: reqBody['state'],
                zipCode: reqBody['zipCode'],
                phone: reqBody['phone'],
                email: reqBody['email'],
                clientLocation: 'OI-Tickets',
                smartOrderLines: reqBody['smartOrderLines']
            }

                let fakeURL = 'http://www.boredpanda.com'; //removed for security purposes

                axios.post(`${fakeURL}`, newOrder, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                .then((res) => {
                    response.send(res.data)
                  })
                  .catch((error) => {
                    response.send(error)
                  })
        
    }
}


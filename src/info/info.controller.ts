import * as express from 'express';
import axios from 'axios';

const endpoints = [
  
  {
    method: 'GET',
    path: '/get-orders',
    description: 'used to fetch orders',
    tokenRequired: true
  },
  {
    method: 'POST',
    path: '/place-order',
    description: 'used to place orders',
    tokenRequired: true
  },
  {
    method: 'GET',
    path: '/validate-token',
    description: 'returns boolean indicating whether provided token is valid.',
    tokenRequired: true
  },
  {
    method: 'GET',
    path: '/get-product-catalog',
    description: 'used to fetch available products based on other criteria. See repo readme for details about criteria.',
    tokenRequired: true
  },
  {
    method: 'GET',
    path: '/cancel-order',
    description: 'used to cancel orders',
    tokenRequired: true
  }
]

export class InfoController {
  public path = '/info';
  public router = express.Router();

  constructor() {
    this.intializeRoutes();
  }

  public intializeRoutes() {
    this.router.get(this.path, this.returnInfo);
  }

  returnInfo = async (request: express.Request, response: express.Response) => {
    response.status(200).send({
        applicationName: 'OI-Tickets',
        version: 1.0,
        endpoints: endpoints
    });

    // get token

    let token: string;

    axios.get('http://www.localhost:5000/get-token')
      .then(function (res) {
        token = res.data
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })

  }
}

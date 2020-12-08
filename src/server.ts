import App from './app';
import { PlaceOrderController } from './place-order/place-order.controller';
import { CancelOrderController } from './cancel-order/cancel-order.controller';
import { GetOrdersController } from './get-orders/get-orders.controller';
import { InfoController } from './info/info.controller';
import { ProductCatalogController } from './product-catalog/product-catalog.controller';
import { ValidateTokenController } from './validate-token/validate-token.controller';
import { SettingsModule } from './utils/settings';
import * as cron from 'node-cron';

// instantiate imported settings class
const settings = new SettingsModule();

// check to ensure range is acceptable
if (settings.markupFloor <= 4) {
  settings.markupFloor = 5;
}
if (settings.markupCeiling >= 22) {
  settings.markupCeiling = 21;
}

let rand = Math.floor(Math.random() * (settings.markupCeiling + 1 - settings.markupFloor)) +settings.markupFloor;

  let randAsString = rand.toString()
  if(rand < 10) {
    randAsString = `0.0${randAsString}`
  } else {
    randAsString = `0.${randAsString}`
  }
  settings.markupRate = Number(randAsString);

cron.schedule('0 1 * * *', () => {
  // check to ensure range is acceptable
  if (settings.markupFloor <= 4) {
    settings.markupFloor = 5;
  }
  if (settings.markupCeiling >= 22) {
    settings.markupCeiling = 21;
  }
  // generate random number
  let rand = Math.floor(Math.random() * (settings.markupCeiling + 1 - settings.markupFloor)) +settings.markupFloor;

  let randAsString = rand.toString()
  if(rand < 10) {
    randAsString = `0.0${randAsString}`
  } else {
    randAsString = `0.${randAsString}`
  }
  settings.markupRate = Number(randAsString);
});

const app = new App(
  [
    new PlaceOrderController(),
    new CancelOrderController(),
    new GetOrdersController(),
    new InfoController(),
    new ProductCatalogController(),
    new CancelOrderController(),
    new ValidateTokenController()
  ],
  5000,
);

app.listen();
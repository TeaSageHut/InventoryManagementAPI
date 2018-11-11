'use strict';

const app = require('express')();
const bodyParser = require('body-parser');
const createInventoryItemController = require('./controller/inventory/createInventoryItemController');
const updateInventoryItemController = require('./controller/inventory/updateInventoryItemController');
const getInventoryItemController = require('./controller/inventory/getInventoryItemController');
const getInventoryItemsController = require('./controller/inventory/getInventoryItemsController');
const placeOrderController = require('./controller/order/placeOrderController');
const port = 3000;

app.use(bodyParser.json());

app.get('/inventory', getInventoryItemsController);

app.get('/inventory/:id', getInventoryItemController);

app.post('/inventory', createInventoryItemController);

app.put('/inventory/:id', updateInventoryItemController);

app.post('/orders', placeOrderController);

app.listen(port, () => console.log(`Inventory management running on port ${port}`));

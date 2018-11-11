'use strict';

const app = require('express')();
const bodyParser = require('body-parser');
const createInventoryItemController = require('./controller/inventory/createInventoryItemController');
const updateInventoryItemController = require('./controller/inventory/updateInventoryItemController');
const getInventoryItemController = require('./controller/inventory/getInventoryItemController');
const placeOrderController = require('./controller/order/placeOrderController');
const port = 3000;

const inventoryMock = require('./mocks/inventory.json');

app.use(bodyParser.json());

app.get('/inventory', (req, res) => {
    res.send(inventoryMock);
});

app.get('/inventory/:id', getInventoryItemController);

app.post('/inventory', createInventoryItemController);

app.put('/inventory/:id', updateInventoryItemController);

app.post('/orders', placeOrderController);

app.listen(port, () => console.log(`Inventory management running on port ${port}`));

'use strict';

const app = require('express')();
const bodyParser = require('body-parser');
const createInventoryItemController = require('./controller/inventory/createInventoryItemController');
const updateInventoryItemController = require('./controller/inventory/updateInventoryItemController');
const port = 3000;

const inventoryMock = require('./mocks/inventory.json');

app.use(bodyParser.json());

app.get('/inventory', (req, res) => {
    res.send(inventoryMock);
});

app.get('/inventory/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);

    res.send(inventoryMock.find((item) => item.id === id));
});

app.post('/inventory', createInventoryItemController);

app.put('/inventory/:id', updateInventoryItemController);

app.listen(port, () => console.log(`Inventory management running on port ${port}`));

const orderRepository = require('../../repository/orderRepository');

const createOrderItemController = (req, res) => {
    const data = req.body;

    // Validate request body
    if (!data.firstName) {
        res.send({"message": "First name is missing."}, 400);
    }
    if (!data.lastName) {
        res.send({"message": "Last name is missing."}, 400);
    }
    if (!data.items) {
        res.send({"message": "Items are missing."}, 400);
    }

    data.items.forEach(item => {
        if (!item.inventoryItemId) {
            res.send({"message": "Inventory item reference is missing."}, 400);
        }
        if (!item.price) {
            res.send({"message": "Price is missing."}, 400)
        }
        if (!item.qty) {
            res.send({"message": "Quantity is missing."}, 400)
        }
    });

    orderRepository.create(data)
                   .then(order => res.send(order));
};

module.exports = createOrderItemController;

const inventoryRepository = require('../../repository/inventoryRepository');

const createInventoryItemController = (req, res) => {
    const data = req.body;

    // Validate request body
    if (!data.name) {
        res.send({"message": "Name is missing."}, 400);
    }
    if (!data.price) {
        res.send({"message": "Price is missing."}, 400);
    }

    inventoryRepository.create(data)
                       .then(item => res.send(item.rows[0]));
};

module.exports = createInventoryItemController;

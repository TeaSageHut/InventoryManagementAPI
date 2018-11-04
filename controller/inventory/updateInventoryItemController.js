const inventoryRepository = require('../../repository/inventoryRepository');

const updateInventoryItemController = (req, res) => {
    const data = req.body;
    const id = req.params.id;

    // Validate request body
    if (!data.name) {
        res.send({"message": "Name is missing."}, 400);
    }
    if (!data.price) {
        res.send({"message": "Price is missing."}, 400);
    }

    inventoryRepository.update(id, data)
                       .then(item => res.send(item.rows[0]));
};

module.exports = updateInventoryItemController;

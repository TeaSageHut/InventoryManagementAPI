const inventoryRepository = require('../../repository/inventoryRepository');

const getInventoryItemsController = (req, res) => {
    inventoryRepository.getAll()
                       .then(items => res.send(items));
};

module.exports = getInventoryItemsController;

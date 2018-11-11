const inventoryRepository = require('../../repository/inventoryRepository');

const getInventoryItemController = (req, res) => {
    const id = req.params.id;

    inventoryRepository.getById(id)
                       .then(item => res.send(item));
};

module.exports = getInventoryItemController;

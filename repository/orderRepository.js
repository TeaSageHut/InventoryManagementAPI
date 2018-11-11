const {Client} = require('pg');
const camelcaseKeys = require('camelcase-keys');

const prepareOrderItems = (orderItems) => {
    return orderItems.map(item => {
        item.total = item.price * item.qty;

        return item;
    });
};

function getClient() {
    const client = new Client();
    client.connect();
    return client;
}

const inventoryRepository = {
    create(data) {
        const client = getClient();

        const orderItems = prepareOrderItems(data.items);
        const total = orderItems.reduce((res, item) => {
            res += item.total;

            return res;
        }, 0);

        // Save the order
        const orderQuery = `INSERT INTO orders (total, first_name, last_name, email) 
        VALUES ($1, $2, $3, $4) 
        RETURNING *;`;

        return client.query(
            orderQuery,
            [
                total, data.firstName, data.lastName, data.email
            ]
        ).then(res => {
            const savedOrder = camelcaseKeys(res.rows[0]);

            // Save the order items
            let queryStack = [];
            orderItems.forEach(item => {
                const orderItemsQuery = `INSERT INTO order_items(order_id, inventory_item_id, price, qty, total) 
                VALUES($1, $2, $3, $4, $5) 
                RETURNING *`;
                const values = [savedOrder.id, item.inventoryItemId, item.price, item.qty, item.total];

                queryStack.push(client.query(orderItemsQuery, values));
            });

            return Promise.all(queryStack)
                          .then(orderItemsRes => {

                              // Create saved order entity
                              const savedOrderItems = orderItemsRes.map(result => camelcaseKeys(result.rows[0]));

                              return {
                                  id: savedOrder.id,
                                  firstName: savedOrder.firstName,
                                  lastName: savedOrder.lastName,
                                  email: savedOrder.email,
                                  total: savedOrder.total,
                                  items: savedOrderItems
                              };
                          });
        });
    }
};

module.exports = inventoryRepository;

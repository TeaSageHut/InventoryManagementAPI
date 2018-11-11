const {Client} = require('pg');
const camelcaseKeys = require('camelcase-keys');

const prepareItem = (data) => {
    const ntdToUsd = 0.033;
    const convertNtdToUsd = (priceNtd) => priceNtd * ntdToUsd;

    if (data.supplierPercentage) {
        data.supplierAmount = data.price / 100 * data.supplierPercentage;
        data.supplierAmountUsd = convertNtdToUsd(data.supplierAmount);
    }

    if (data.supplierAmount && !data.supplierPercentage) {
        data.supplierPercentage = data.supplierAmount / data.price * 100;

        if (!data.supplierAmountUsd) {
            data.supplierAmountUsd = convertNtdToUsd(data.supplierAmount);
        }
    }

    if (!data.priceUsd) {
        data.priceUsd = convertNtdToUsd(data.price);
    }

    return data;
};

function getClient() {
    const client = new Client();
    client.connect();

    return client;
}

const inventoryRepository = {
    getAll() {
        return getClient()
            .query(`SELECT * FROM items;`)
            .then((res) => res.rows.map(row => prepareItem(camelcaseKeys(row))));
    },

    getById(id) {
        return getClient()
            .query(`SELECT * FROM items WHERE id = $1;`, [id])
            .then((res) => prepareItem(camelcaseKeys(res.rows[0])));
    },

    create(data) {
        prepareItem(data);

        const query = `INSERT INTO items (name, price, price_usd, thumbnail, stock, supplier_percentage, supplier_amount, supplier_amount_usd) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
        RETURNING *;`;

        return getClient().query(
            query,
            [
                data.name, data.price, data.priceUsd, data.thumbnail, data.stock, data.supplierPercentage,
                data.supplierAmount, data.supplierAmountUsd
            ]
        );
    },

    update(id, data) {
        return this.getById(id).then((item) => {
            data = prepareItem(Object.assign({}, item, data));

            const query = `UPDATE items SET name = $1, price = $2, price_usd = $3, thumbnail = $4, stock = $5, supplier_percentage = $6, 
supplier_amount = $7, supplier_amount_usd = $8 
            WHERE id=${id} 
            RETURNING *;`;

            return getClient().query(
                query,
                [
                    data.name, data.price, data.priceUsd, data.thumbnail, data.stock, data.supplierPercentage,
                    data.supplierAmount, data.supplierAmountUsd
                ]
            );
        });
    }
};

module.exports = inventoryRepository;

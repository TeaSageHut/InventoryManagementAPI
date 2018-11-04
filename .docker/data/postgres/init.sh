#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --d "$POSTGRES_DB" <<-EOSQL
    CREATE TABLE IF NOT EXISTS items (
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
    price FLOAT NOT NULL,
    price_usd FLOAT,
    thumbnail VARCHAR(255),
    stock INTEGER,
    supplier_percentage FLOAT,
    supplier_amount FLOAT,
    supplier_amount_usd FLOAT
    );
EOSQL

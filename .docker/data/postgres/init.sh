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

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --d "$POSTGRES_DB" <<-EOSQL
    CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    total FLOAT,
    first_name VARCHAR NOT NULL,
    last_name VARCHAR NOT NULL,
    email VARCHAR
    );
EOSQL

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --d "$POSTGRES_DB" <<-EOSQL
    CREATE TABLE IF NOT EXISTS order_items (
    id SERIAL PRIMARY KEY,
    order_id INTEGER REFERENCES orders(id),
    inventory_item_id INTEGER REFERENCES items(id),
    price FLOAT NOT NULL,
    qty INTEGER NOT NULL,
    total FLOAT NOT NULL
    );
EOSQL

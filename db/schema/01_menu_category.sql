DROP TABLE IF EXISTS menu_category CASCADE;
CREATE TABLE menu_category (
  id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(255) NOT NULL
);

-- DROP TABLE IF EXISTS menu_items CASCADE;
-- CREATE TABLE menu_items (
--   id SERIAL PRIMARY KEY NOT NULL,
--   name VARCHAR(255) NOT NULL,
--   price INTEGER NOT NULL,
--   description VARCHAR(255) NOT NULL,
--   category_id INTEGER REFERENCES menu_category(id) ON DELETE CASCADE,
--   thumbnail_photo_url VARCHAR(255),
--   cover_photo_url VARCHAR(255)
--   );

-- DROP TABLE IF EXISTS menu_item_options CASCADE;
-- CREATE TABLE menu_item_options (
--   id SERIAL PRIMARY KEY NOT NULL,
--   name VARCHAR(255) NOT NULL,
--   size VARCHAR(255) NOT NULL,
--   price INTEGER NOT NULL,
--   menu_item_id INTEGER REFERENCES menu_items(id) ON DELETE CASCADE
-- );

-- DROP TABLE IF EXISTS menu_item_addons CASCADE;
-- CREATE TABLE menu_item_addons (
--   id SERIAL PRIMARY KEY NOT NULL,
--   name VARCHAR(255) NOT NULL,
--   price INTEGER NOT NULL,
--   menu_item_id INTEGER REFERENCES menu_items(id) ON DELETE CASCADE
-- );

-- DROP TABLE IF EXISTS order_items CASCADE;
-- CREATE TABLE order_items (
--   id SERIAL PRIMARY KEY,
--   quantity INTEGER NOT NULL,
--   total_price INTEGER NOT NULL,
--   item_id INTEGER REFERENCES menu_items(id) ON DELETE CASCADE,
--   item_option_id INTEGER REFERENCES menu_item_options(id) ON DELETE CASCADE,
--   item_addon_id INTEGER REFERENCES menu_item_addons(id) ON DELETE CASCADE,
--   order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE
-- );

-- DROP TABLE IF EXISTS orders CASCADE;
-- CREATE TABLE orders (
--   id SERIAL PRIMARY KEY,
--   status VARCHAR(255) NOT NULL,
--   order_items_count INTEGER NOT NULL,
--   customer_id INTEGER REFERENCES customers(id) ON DELETE CASCADE,
--   estimated_prep_time INTEGER NOT NULL,
--   order_time TIMESTAMP NOT NULL,
--   start_time TIMESTAMP,
--   completion_time TIMESTAMP,
--   total_price INTEGER NOT NULL
-- );

-- DROP TABLE IF EXISTS customers CASCADE;
-- CREATE TABLE customers (
--   id SERIAL PRIMARY KEY,
--   name VARCHAR(255) NOT NULL,
--   phone INTEGER NOT NULL,
--   email VARCHAR(255) NOT NULL
-- );


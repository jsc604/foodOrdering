DROP TABLE IF EXISTS orders CASCADE;
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  status VARCHAR(255) NOT NULL,
  order_items_count INTEGER NOT NULL,
  customer_id INTEGER REFERENCES customers(id) ON DELETE CASCADE,
  estimated_prep_time INTEGER NOT NULL,
  order_time TIMESTAMP NOT NULL,
  start_time TIMESTAMP,
  completion_time TIMESTAMP,
  total_price INTEGER NOT NULL
);

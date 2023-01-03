CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  status VARCHAR(255) NOT NULL
  order_items_count INTEGER NOT NULL,
  customer_id INTEGER REFERENCES customer(id) ON DELETE CASCADE,
  estimated_prep_time INTEGER NOT NULL,
  start_time timestamp NOT NULL,
  competion_time timestamp NULL,
  total_Price INTEGER NOT NULL
)

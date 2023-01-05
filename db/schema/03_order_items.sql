DROP TABLE IF EXISTS order_items CASCADE;
CREATE TABLE order_items (
  id SERIAL PRIMARY KEY,
  quantity INTEGER NOT NULL,
  total_price INTEGER NOT NULL,
  size VARCHAR(255),
  milk VARCHAR(255),
  espresso_option VARCHAR(255),
  flavour VARCHAR(255),
  special_request VARCHAR(255),
  item_id INTEGER REFERENCES menu_items(id) ON DELETE CASCADE,
  order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE
);

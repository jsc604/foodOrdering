DROP TABLE IF EXISTS order_items CASCADE;
CREATE TABLE order_items (
  id SERIAL PRIMARY KEY,
  quantity INTEGER NOT NULL,
  total_price INTEGER NOT NULL,
  item_id INTEGER REFERENCES menu_items(id) ON DELETE CASCADE,
  item_option_id INTEGER REFERENCES menu_item_options(id) ON DELETE CASCADE,
  item_addon_id INTEGER REFERENCES menu_item_addons(id) ON DELETE CASCADE,
  order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE
);

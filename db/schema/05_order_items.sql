CREATE TABLE order_items (
  id SERIAL PRIMARY KEY,
  total_price INTEGER NOT NULL
  item_addon_id INTEGER REFERENCES menu_item_addons(id) ON DELETE CASCADE,
  item_option_id INTEGER REFERENCES menu_item_options(id) ON DELETE CASCADE,
  item_id INTEGER REFERENCES items(id) ON DELETE CASCADE,
  order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL,
);

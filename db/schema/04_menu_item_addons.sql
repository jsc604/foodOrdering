DROP TABLE IF EXISTS menu_item_addons CASCADE;
CREATE TABLE menu_item_addons (
  id SERIAL PRIMARY KEY NOT NULL,
  addon_category VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  price INTEGER NOT NULL,
  menu_item_id INTEGER REFERENCES menu_items(id) ON DELETE CASCADE
);

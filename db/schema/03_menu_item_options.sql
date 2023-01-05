DROP TABLE IF EXISTS menu_item_options CASCADE;
CREATE TABLE menu_item_options (
  id SERIAL PRIMARY KEY NOT NULL,
  option_category VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  price INTEGER NOT NULL,
  menu_item_id INTEGER REFERENCES menu_items(id) ON DELETE CASCADE
);

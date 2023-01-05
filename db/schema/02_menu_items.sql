DROP TABLE IF EXISTS menu_items CASCADE;
CREATE TABLE menu_items (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  price INTEGER NOT NULL,
  description VARCHAR(255) NOT NULL,
  category_id INTEGER REFERENCES menu_category(id) ON DELETE CASCADE,
  thumbnail_photo_url VARCHAR(255)
  );

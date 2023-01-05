const db = require('../connection');

//select menu_items
const getMenuItems = function(category_name) {
  return db.
  query(`SELECT menu_items.id, menu_items.name, price, description, thumbnail_photo_url
  FROM menu_items JOIN menu_category ON category_id = menu_category.id
  WHERE menu_category.name = $1;`, [category_name])
  .then(result => {
    console.log(result.rows);
    return result.rows;
  })
};
//select menu_options
const getItemOptions = function(item_id) {
  return db.
  query(`SELECT option_category, menu_item_options.name, menu_item_options.price
  FROM menu_item_options JOIN menu_items ON menu_item_id= menu_items.id
  WHERE menu_items.id = $1; RETURNING *;`, [item_name])
  .then(result => result.rows[0])
  .catch(err => console.log(err));
};
//select menu_addons
const getAddonOptions = function(item_id) {
  return db.
  query(`SELECT addon_category, menu_addon_options.name, menu_addon_options.price
  FROM menu_addon_options JOIN menu_items ON menu_item_id= menu_items.id
  WHERE menu_items.id = $1; RETURNING *;`, [item_name])
  .then(result => result.rows[0])
  .catch(err => console.log(err));
};

//create new order
const createNewOrder = function(item) {
  return db.
  query(`INSERT INTO orders (status, order_items_count, customer_id, estimated_prep_time, order_time, total_price) VALUES ($1, $2, $3 ,$4, NOW(), $6); RETURNING *;`, ['incomplete', item.count, item.customer_id, item.estimated_prep_time, item.total_price])
  .then(result => result.rows[0])
  .catch(err => console.log(err));
}
//insert start_time to order
const startOrder = function(order_id) {
  return db.
  query(`UPDATE orders SET start_time = NOW() WHERE id = $1; RETURNING *;`, [order_id])
  .then(result => result.rows[0])
  .catch(err => console.log(err));
}

//insert completion_time to order
const completeOrder = function(order_id) {
  return db.
  query(`UPDATE orders SET completion_time = NOW() WHERE id = $1; RETURNING *;`, [order_id])
  .then(result => result.rows[0])
  .catch(err => console.log(err));
}

//insert item to order
const addItemToOrder = function(item) {
  const total_price = item.price*item.quantity;
  return db.
  query(`INSERT INTO order_items (quantity, total_price, item_id,item_option_id, item_addon_id, order_id) VALUES ($1, $2, $3, $4, $5, $6);`, [item.quantity, total_price, item.item_id, item_item_option_id, item_addon_id, order_id])
  .then(result => {
    return result.rows;
  })
};

module.exports = { getMenuItems, getItemOptions };

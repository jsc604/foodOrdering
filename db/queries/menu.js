const db = require('../connection');

//select menu_items
const getMenuItems = function(category_name) {
  return db.
  query(`SELECT menu_items.id, menu_items.name, price, description, thumbnail_photo_url
  FROM menu_items JOIN menu_category ON category_id = menu_category.id
  WHERE menu_category.name = $1;`, [category_name])
  .then(result => {
    return result.rows;
  })
};

//create new order
const createNewOrder = function(item) {
  return db.
  query(`INSERT INTO orders (status, customer_id, estimated_prep_time, order_time, total_price) VALUES ($1, $2, $3 , $4, $5) RETURNING *;`, ['incomplete', item.id, item.estimated_prep_time, item.order_time, item.total_price])
  .then(result => result.rows[0])
  .catch(err => console.log(err));
}

//insert item to order
const addItemToOrder = function(item) {
  return db.
  query(`INSERT INTO order_items (quantity, total_price, instructions, item_id, order_id) VALUES ($1, $2, $3, $4, $5)
  RETURNING *;`, [item.quantity, item.total_price, item.instructions, item.item_id, item.id])
  .then(result => {
    console.log('add',result.rows);
    return result.rows;
  })
};

//add customer
const addCustomer = function(data) {
  return db.
  query(`INSERT INTO customers (name, phone) VALUES ($1, $2) RETURNING *;`, [data.name, data.phone])
  .then(result => {
    console.log(result.rows);
    return result.rows[0];
  })
};

module.exports = { getMenuItems, createNewOrder, addItemToOrder, addCustomer };

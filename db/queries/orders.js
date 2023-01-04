const db = require('../connection');

const getNewOrders = () => {
  return db.query(`
  SELECT orders.id AS id, customers.name AS name, menu_items.name AS item
  FROM orders
  JOIN customers ON customers.id = orders.customer_id
  JOIN order_items ON orders.id = order_items.order_id
  JOIN menu_items ON menu_items.id = order_items.item_id
  WHERE status = 'incomplete';
  `)
    .then(data => {
      return data.rows;
    });
};

const getCompletedOrders = () => {
  return db.query(`
  SELECT orders.id AS id, customers.name AS name, menu_items.name AS item, orders.completion_time AS completed_at
  FROM orders
  JOIN customers ON customers.id = orders.customer_id
  JOIN order_items ON orders.id = order_items.order_id
  JOIN menu_items ON menu_items.id = order_items.item_id
  WHERE status = 'complete';
  `)
    .then(data => {
      console.log('/////////////');
      return data.rows;
    });
};

module.exports = { getNewOrders, getCompletedOrders };

const db = require('../connection');

// GET NEW ORDERS
const getNewOrders = () => {
  return db.query(`
  SELECT o.id AS order_id, c.name AS customer_name, i.name AS item_name,
       a.name AS item_addon, op.name AS item_option, o.completion_time AS completed_at
  FROM orders o
  JOIN customers c ON o.customer_id = c.id
  JOIN order_items oi ON o.id = oi.order_id
  JOIN menu_items i ON oi.item_id = i.id
  LEFT JOIN menu_item_addons a ON oi.item_addon_id = a.id
  LEFT JOIN menu_item_options op ON oi.item_option_id = op.id
  WHERE status = 'incomplete';
  `)
    .then(data => {
      return data.rows;
    });
};

// GET COMPLETED ORDERS
const getCompletedOrders = () => {
  return db.query(`
  SELECT o.id AS order_id, c.name AS customer_name, i.name AS item_name,
       a.name AS item_addon, op.name AS item_option, o.completion_time AS completed_at
  FROM orders o
  JOIN customers c ON o.customer_id = c.id
  JOIN order_items oi ON o.id = oi.order_id
  JOIN menu_items i ON oi.item_id = i.id
  LEFT JOIN menu_item_addons a ON oi.item_addon_id = a.id
  LEFT JOIN menu_item_options op ON oi.item_option_id = op.id
  WHERE status = 'complete';
  `)
    .then(data => {
      return data.rows;
    });
};

// START ORDER
const startOrder = (id) => {
  return db.query(`
  UPDATE orders SET start_time = CURRENT_TIMESTAMP WHERE id = $1;`, [id])
    .then(data => {
      return data.rows;
    });
}
module.exports = { getNewOrders, getCompletedOrders, startOrder };

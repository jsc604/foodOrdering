const db = require('../connection');

// GET NEW ORDERS
const getNewOrders = () => {
  return db.query(`
  SELECT o.id AS order_id, c.name AS customer_name, i.name AS item_name, mc.id AS category_id,
       oi.size, oi.milk, oi.espresso_option, oi.flavour, oi.special_request, oi.quantity, o.start_time
  FROM orders o
  JOIN customers c ON o.customer_id = c.id
  JOIN order_items oi ON o.id = oi.order_id
  JOIN menu_items i ON oi.item_id = i.id
  JOIN menu_category mc ON i.category_id = mc.id
  WHERE o.status = 'incomplete';
  `)
    .then(data => {
      return data.rows;
    });
};

// GET COMPLETED ORDERS
const getCompletedOrders = () => {
  return db.query(`
  SELECT o.id AS order_id, c.name AS customer_name, i.name AS item_name, mc.id AS category_id,
  oi.size, oi.milk, oi.espresso_option, oi.flavour, oi.special_request, oi.quantity,
  o.completion_time AS completed_at, o.picked_up
FROM orders o
JOIN customers c ON o.customer_id = c.id
JOIN order_items oi ON o.id = oi.order_id
JOIN menu_items i ON oi.item_id = i.id
JOIN menu_category mc ON i.category_id = mc.id
WHERE o.status = 'complete';
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
};

// COMPLETE ORDER
const completeOrder = (id) => {
  return db.query(`
  UPDATE orders
  SET completion_time = CURRENT_TIMESTAMP,
      status = 'complete'
  WHERE id = $1;
  `, [id])
    .then(data => {
      return data.rows;
    });
};

// PICK UP ORDER
const pickUpOrder = (id) => {
  return db.query(`
  UPDATE orders
  SET picked_up = true
  WHERE id = $1;
  `, [id])
    .then(data => {
      return data.rows;
    });
};

module.exports = { getNewOrders, getCompletedOrders, startOrder, completeOrder, pickUpOrder };

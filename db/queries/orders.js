const db = require('../connection');

const getNewOrders = () => {
  console.log('get new orders');
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



module.exports = { getNewOrders };

const express = require('express');
const router  = express.Router();
const userQueries = require('../db/queries/orders');

// GET NEW ORDERS
router.get('/new', (req, res) => {
  userQueries.getNewOrders()
    .then(newOrders => {
      const ordersObject = {};

      for (let order of newOrders) {
        if (!ordersObject[order.order_id]) {
          ordersObject[order.order_id] = {
            id: order.order_id,
            name: order.customer_name,
            items: [`${order.item_name} - (options: ${order.item_option}), (addons: ${order.item_addon})`],
            completed_at: order.completed_at
          };
        } else {
          ordersObject[order.order_id].items.push(`${order.item_name} - (options: ${order.item_option}), (addons: ${order.item_addon})`);
        }
      }

      const templateVars = { ordersObject };
      res.render('restaurant_new', templateVars);
      return;
    });
});

// GET COMPLETED ORDERS
router.get('/complete', (req, res) => {
  userQueries.getCompletedOrders()
    .then(completedOrders => {
      const ordersObject = {};

      for (let order of completedOrders) {
        if (!ordersObject[order.order_id]) {
          ordersObject[order.order_id] = {
            id: order.order_id,
            name: order.customer_name,
            items: [`${order.item_name} - (options: ${order.item_option}), (addons: ${order.item_addon})`],
            completed_at: order.completed_at
          };
        } else {
          ordersObject[order.order_id].items.push(`${order.item_name} - (options: ${order.item_option}), (addons: ${order.item_addon})`);
        }
      }

      console.log('----', completedOrders);
      const templateVars = { ordersObject };
      res.render('restaurant_completed', templateVars);
      return;
    });
});

// POST START ORDER
router.post('/start-order', (req, res) => {
  console.log(req.body.start_order);
  const customerId = req.body.start_order;
  userQueries.startOrder(customerId)
    .then(data => {
      console.log('......order recorded.......');
      return;
    });

});

//POST COMPLETE ORDER
router.post('/complete-order', (req, res) => {
  console.log(req.body);
});

// POST PICKUP ORDER
router.post('/complete', (req, res) => {
  console.log(req.body);
});

module.exports = router;

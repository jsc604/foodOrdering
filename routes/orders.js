const express = require('express');
const router = express.Router();
const userQueries = require('../db/queries/orders');
const { messageToCustomer, messageToRestaurant } = require('../twilio');

// GET NEW ORDERS
router.get('/new', (req, res) => {
  userQueries.getNewOrders()
    .then(newOrders => {
      const ordersObject = {};

      for (let order of newOrders) {
        if (!ordersObject[order.order_id]) {
          if (order.category_id === 1) {
            ordersObject[order.order_id] = {
              id: order.order_id,
              name: order.customer_name,
              items: [`${order.quantity} x ${order.item_name} - [instructions: ${order.instructions}]`],
              completed_at: order.completion_time,
              start_time: order.start_time
            };
          } else if (order.category_id === 2) {
            ordersObject[order.order_id] = {
              id: order.order_id,
              name: order.customer_name,
              items: [`${order.quantity} x ${order.item_name} - [instructions: ${order.instructions}]`],
              completed_at: order.completion_time,
              start_time: order.start_time
            };
          } else if (order.category_id === 3) {
            ordersObject[order.order_id] = {
              id: order.order_id,
              name: order.customer_name,
              items: [`${order.quantity} x ${order.item_name} - [instructions: ${order.instructions}]`],
              completed_at: order.completion_time,
              start_time: order.start_time
            };
          }
        } else if (ordersObject[order.order_id]) {
          if (order.category_id === 1) {
            ordersObject[order.order_id].items.push(`${order.quantity} x ${order.item_name} - [instructions: ${order.instructions}]`);
          } else if (order.category_id === 2) {
            ordersObject[order.order_id].items.push(`${order.quantity} x ${order.item_name} - [instructions: ${order.instructions}]`);
          } else if (order.category_id === 3) {
            ordersObject[order.order_id].items.push(`${order.quantity} x ${order.item_name} - [instructions: ${order.instructions}]`);
          }
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
          if (order.category_id === 1) {
            ordersObject[order.order_id] = {
              id: order.order_id,
              name: order.customer_name,
              items: [`${order.quantity} x ${order.item_name} - [instructions: ${order.instructions}]`],
              completed_at: order.completion_time,
              picked_up: order.picked_up
            };
          } else if (order.category_id === 2) {
            ordersObject[order.order_id] = {
              id: order.order_id,
              name: order.customer_name,
              items: [`${order.quantity} x ${order.item_name} - [instructions: ${order.instructions}]`],
              completed_at: order.completion_time,
              picked_up: order.picked_up
            };
          } else if (order.category_id === 3) {
            ordersObject[order.order_id] = {
              id: order.order_id,
              name: order.customer_name,
              items: [`${order.quantity} x ${order.item_name} - [[instructions: ${order.instructions}]`],
              completed_at: order.completion_time,
              picked_up: order.picked_up
            };
          }
        } else if (ordersObject[order.order_id]) {
          if (order.category_id === 1) {
            ordersObject[order.order_id].items.push(`${order.quantity} x ${order.item_name} - [instructions: ${order.instructions}]`);
          } else if (order.category_id === 2) {
            ordersObject[order.order_id].items.push(`${order.quantity} x ${order.item_name} - [instructions: ${order.instructions}]`);
          } else if (order.category_id === 3) {
            ordersObject[order.order_id].items.push(`${order.quantity} x ${order.item_name} - [instructions: ${order.instructions}]`);
          }
        }
      }

      const templateVars = { ordersObject };
      res.render('restaurant_completed', templateVars);
      return;
    });
});

// POST START ORDER
router.post('/start-order', (req, res) => {
  const customerId = req.body.start_order;
  userQueries.startOrder(customerId);
  messageToCustomer(customerId, customerId, customerId);
  console.log('......order recorded.......');
  return;
});

//POST COMPLETE ORDER
router.post('/complete-order', (req, res) => {
  const customerId = req.body.complete_order;
  console.log('======', customerId);
  userQueries.completeOrder(customerId)
    .then(data => {
      console.log('......order completed.......');
      res.redirect('/orders/new');
    });
});

// POST PICKUP ORDER
router.post('/complete', (req, res) => {
  const customerId = req.body.status;
  userQueries.pickUpOrder(customerId);
  console.log('......order picked up.......');
  return;
});

module.exports = router;

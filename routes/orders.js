const express = require('express');
const router  = express.Router();
const userQueries = require('../db/queries/orders');

// GET NEW ORDERS
router.get('/new', (req, res) => {
  userQueries.getNewOrders()
    .then(newOrders => {
      const ordersObject = {};

      for (let order of newOrders) {
        if (!ordersObject[order.id]) {
          ordersObject[order.id] = {
            id: order.id,
            name: order.name,
            items: [order.item]
          };
        } else {
          ordersObject[order.id].items.push(order.item);
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
        if (!ordersObject[order.id]) {
          ordersObject[order.id] = {
            id: order.id,
            name: order.name,
            items: [order.item],
            completed_at: order.completed_at
          };
        } else {
          ordersObject[order.id].items.push(order.item);
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
  console.log(req.body);
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

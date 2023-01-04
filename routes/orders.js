const express = require('express');
const router  = express.Router();
const userQueries = require('../db/queries/orders');

// GET NEW ORDERS
router.get('/new', (req, res) => {
  userQueries.getNewOrders()
    .then(newOrders => {
      console.log('----', newOrders);
      const templateVars = { newOrders };
      res.render('restaurant_new', templateVars);
    });
});

// GET COMPLETED ORDERS
// router.get('/complete' (req, res) => {

// })
// router.post('/new', (req, res) => {
//   console.log('inside this post route', req.body);
// });

module.exports = router;

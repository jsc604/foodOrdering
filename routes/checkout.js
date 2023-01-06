const express = require('express');
const router = express.Router();
const userQueries = require('../db/queries/menu');

//checkout
router.post('/checkout', (req, res) => {
  res.json(req.body);
});

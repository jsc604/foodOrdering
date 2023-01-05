const express = require('express');
const router  = express.Router();
const userQueries = require('../db/queries/menu');

router.get('/', (req, res) => {
  userQueries.getItemOptions()
    .then(users => {
      res.json({ users });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

module.exports = router;

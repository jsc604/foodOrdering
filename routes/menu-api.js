const express = require('express');
const router = express.Router();
const userQueries = require('../db/queries/menu');

//left side menu
router.get('/', (req, res) => {
  let templateVars = {};
  userQueries.getMenuItems('Coffee')
    .then(results => {
      const coffeeObject = getItemsFromCategory(results);
      templateVars.coffeeObject = coffeeObject;
    })
  userQueries.getMenuItems('Bakery')
    .then(results => {
      const bakeryObject = getItemsFromCategory(results);
      templateVars.bakeryObject = bakeryObject;
    })
  userQueries.getMenuItems('Miscellaneous')
    .then(results => {
      const miscellaneousObject = getItemsFromCategory(results);
      templateVars.miscellaneousObject = miscellaneousObject;
    })
    .then(r => { res.render('menu', templateVars); })
    .catch(err => {
      res.status(500)
        .json({ error: err.message });
    });
});

const getItemsFromCategory = function (results) {
  let menuObject = {};
  for (result of results) {
    menuObject[result.id] = { name: result.name, price: result.price, description: result.description, thumbnail_photo_url: result.thumbnail_photo_url };
  }
  return menuObject;
}


module.exports = router;

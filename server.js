// load .env data into process.env
require('dotenv').config();
const cookieSession = require('cookie-session');

// Web server config
const sassMiddleware = require('./lib/sass-middleware');
const express = require('express');
const morgan = require('morgan');

const PORT = process.env.PORT || 8080;
const app = express();

app.set('view engine', 'ejs');

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



app.use(
  '/styles',
  sassMiddleware({
    source: __dirname + '/styles',
    destination: __dirname + '/public/styles',
    isSass: false, // false => scss, true => sass
  })
);
app.use(express.static('public'));

app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const userApiRoutes = require('./routes/users-api');
const widgetApiRoutes = require('./routes/widgets-api');
const usersRoutes = require('./routes/users');
const menuRoutes = require('./routes/menu-api');

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// Note: Endpoints that return data (eg. JSON) usually start with `/api`
app.use('/api/users', userApiRoutes);
app.use('/api/widgets', widgetApiRoutes);
app.use('/users', usersRoutes);
app.use('/menu', menuRoutes);
// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get('/', (req, res) => {
const id = req.session.user_id;
//fetch user from database
const user = {id, name: "Alice"};
console.log(user);
if (!user) {
  res.render('menu');
  return;
}



  res.render('index', {user});
});
app.get('/popup', (req, res) => {
  res.render('popup');
})

app.get('/login/:id', (req, res) => {
  const id = req.params.id;
// Save id in session
  req.session.user_id = id;



  res.redirect('/');
});

app.post('/menu', (req, res) => {
  console.log("body", req.body);
  //const data =
  res.json(req.body);
});


app.get('/new-orders', (req, res) => {
  res.render('restaurant_new');
  return;
});

app.post('/new-orders', (req, res) => {
  res.redirect('/completed-orders');
});

app.get('/completed-orders', (req, res) => {
  res.render('restaurant_completed');
  return;
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

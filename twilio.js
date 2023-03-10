require("dotenv").config();

const accountSid = process.env.twilioSID;
// console.log(accountSid)
const authToken = process.env.twilioTOKEN;
const toNumber = process.env.toNumber;
const fromNumber = process.env.fromNumber;
const client = require("twilio")(accountSid, authToken);

const messageToCustomer = (name, orderID, waitTime, phone) => {
  client.messages
    .create({
      body: `Hi ${name}, your order ID is ${orderID}. The estimated wait time is ${waitTime} minutes`,
      from: fromNumber,
      // will replace to number with the ones from db later - CUSTOMER NUMBER
      to: toNumber,
    })
    .then((message) => console.log(`order id: ${orderID}`))
    .catch((err) => {
      console.log(err);
    });
};

const messageToRestaurant = (orderID) => {
  client.messages
    .create({
      body: `New order was placed. Order ID is ${orderID}`,
      from: fromNumber,
      // this is "restaurant" number will be a personal # , will not be replaced
      to: toNumber,
    })
    .then((message) => console.log(`order id: ${orderID}`))
    .catch((err) => {
      console.log(err);
    });
};

module.exports = { messageToCustomer, messageToRestaurant };

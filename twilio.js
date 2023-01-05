require("dotenv").config();

const accountSid = process.env.twilioSID;
// console.log(accountSid)
const authToken = process.env.twilioTOKEN;
const toNumber = process.env.toNumber;
const fromNumber = process.env.fromNumber;
const client = require("twilio")(accountSid, authToken);

// client.messages
// .create({
//   body: 'hello world test',
//   from: fromNumber,
//   to: toNumber
// })
// .then((message) => console.log(message));

const messageToCustomer = (name, phone, orderID, waitTime) => {
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
      body: `New order. Order ID is ${orderID}`,
      from: fromNumber,
      // this is "restaurant" number will be a personal # , will not be replaced
      to: toNumber,
    })
    .then((message) => console.log(`order id: ${orderID}`))
    .catch((err) => {
      console.log(err);
    });
};

module.exports = { messageToCustomer, messageToRestaurant }

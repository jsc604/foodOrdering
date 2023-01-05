require('dotenv').config()

const accountSid = process.env.twilioSID;
// console.log(accountSid)
const authToken = process.env.twilioTOKEN;
const toNumber = process.env.toNumber;
const fromNumber = process.env.fromNumber;
const client = require('twilio')(accountSid, authToken);


client.messages
.create({
  body: 'hello world test',
  from: fromNumber,
  to: toNumber
})
.then((message) => console.log(message));


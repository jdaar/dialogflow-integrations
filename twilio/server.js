require('dotenv').config()
require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// Server
const express = require('express');
const request = require('request');

const app = express();
const bodyparser = require('body-parser');

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

// Dialogflow
const dialogflowSessionClient =
  require('../botlib/dialogflow_session_client.js');
const sessionClient = new dialogflowSessionClient(process.env.GCP_PROJECT_ID);

// Twilio
const MessagingResponse = require('twilio').twiml.MessagingResponse;

// Routes
app.post('/', async function (req, res) {
  const body = req.body;
  const text = body.Body;
  const id = body.From;

  const dialogflowResponse = (await sessionClient.detectIntent(
    text, id, body)).fulfillmentText;

  const twiml = new MessagingResponse();

  twiml.message(dialogflowResponse);

  res.send(twiml.toString());
});

// Listener
const listener = app.listen(process.env.PORT, function () {
  console.log(`Server listening on port: ${listener.address().port}`);
});

// Kill server
process.on('sigterm', () => {
  listener.close(() => {
    console.log('closing http server.');
    process.exit(0);
  });
});


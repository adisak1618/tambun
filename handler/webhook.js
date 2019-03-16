const line = require('@line/bot-sdk');
const config = require('../config');

// create LINE SDK client
const client = new line.Client(config);

module.exports = (event) => {
  console.log('event log', event);
  if (event.type !== 'message' || event.message.type !== 'text') {
    // ignore non-text-message event
    return Promise.resolve(null);
  }

  // create a echoing text message
  const echo = { type: 'text', text: event.message.text };

  // use reply API
  return client.replyMessage(event.replyToken, echo);
}
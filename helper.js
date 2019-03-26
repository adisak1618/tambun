const line = require('@line/bot-sdk');
const config = require('./config');
const client = new line.Client(config);

exports.client = client;

exports.replyMessage = (replyToken, data) => {
  return client.replyMessage(replyToken, data);
}

exports.takeStep = () => {
  
}

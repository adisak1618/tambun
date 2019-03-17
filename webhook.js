const line = require('@line/bot-sdk');
const config = require('./config');


// create LINE SDK client
const client = new line.Client(config);

const flex1 = {  
  "type": "flex",
  "altText": "this is a flex message",
  "contents": {
    "type": "bubble",
    "body": {
      "type": "box",
      "layout": "vertical",
      "contents": [
        {
          "type": "text",
          "text": "hello"
        },
        {
          "type": "text",
          "text": "world"
        }
      ]
    }
  }
};

const template1 = {
  "type": "template",
  "altText": "this is a confirm template",
  "template": {
      "type": "confirm",
      "text": "Are you sure?",
      "actions": [
          {
            "type": "message",
            "label": "Yes",
            "text": "yes"
          },
          {
            "type": "message",
            "label": "No",
            "text": "no"
          }
      ]
  }
};

module.exports = (event) => {
  console.log('event log', event);
  if (event.type === 'follow') {
    const echo = [{ type: 'text', text: 'สวัสดีครับ เราทำให้การสะสมคะแนนเป็นเรื่องง่าย' }, { type: 'text', text: 'เริ่มเก็บคะแนนกับเรา' }];
    return client.replyMessage(event.replyToken, echo);
  } else if (event.type === 'message') {
    return client.replyMessage(event.replyToken, [flex1, template1]);
  } else {
    return Promise.resolve(null);
  }
  // if (event.type !== 'message' || event.message.type !== 'text') {
  //   // ignore non-text-message event
  //   return Promise.resolve(null);
  // }

  // // create a echoing text message
  // const echo = { type: 'text', text: event.message.text };

  // // use reply API
  // return client.replyMessage(event.replyToken, echo);
}
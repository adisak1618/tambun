const { client, replyMessage } = require('../helper');
const models = require('./../models');
const actionMenu = require('./../components/actionMenu');

module.exports = async (event, action, user) => {
  const introStep = (newAction) => {
    // introduce
    const introAction = newAction || action;
    introAction.step = 1;
    introAction.save();
    return replyMessage(event.replyToken, [
      { type: 'text', text: 'เริ่มเพิ่มของรางวัลเลย!' },
      {
        type: 'text',
        text: 'ชื่อของรางวัล',
        // "quickReply": {
        //   "items": [
        //     {
        //       "type": "action",
        //       "action": {
        //         "type": "postback",
        //         "label": "ยกเลิก",
        //         "data":"cancle_registerUser",
        //         "displayText": "ยกเลิกแล้ว",
        //       }
        //     }
        //   ]
        // }
      }
    ]);
  }

  const rewardNameStep = () => {
    if(event.type === 'message' && event.message.type === 'text') {
      let data = action.data || {};
      data = Object.assign(data, { name: event.message.text});
      action.data = data;
      action.step = 2,
      action.save();
      return replyMessage(event.replyToken, [
        { type: 'text', text: 'รายละเอียด เช่น มูลค่าเท่าไหร่ เป็นอะไร' }
      ]);
    } else {
      return replyMessage(event.replyToken, [{ type: 'text', text: 'ข้อมูลไม่ถูกต้อง โปรดพิมชื่อรางวัลของคุณอีกครั้ง!' }, { type: 'text', text: 'ชื่อเล่น' }]);
    }
  }

  const detailStep = () => {
    if(event.type === 'message' && event.message.type === 'text') {
      let data = action.data || {};
      data = Object.assign(data, { detail: event.message.text});
      action.data = data;
      action.step = 3,
      action.save();
      return replyMessage(event.replyToken, [
        { type: 'text', text: 'คะแนนที่ต้องใช้ เพื่อแลกของรางวัลชิ้นนี้' }
      ]);
    } else {
      return replyMessage(event.replyToken, [{ type: 'text', text: 'ข้อมูลไม่ถูกต้อง โปรดพิมรายละเอียดของคุณอีกครั้ง!' }, { type: 'text', text: 'ชื่อเล่น' }]);
    }
  }

  const redeemPointNameStep = async () => {
    if(event.type === 'message' && event.message.type === 'text' && !isNaN(event.message.text)) {
      let data = action.data || {};
      data = Object.assign(data, { redeempoint: event.message.text, shop_id: user.user.shop.id });
      action.data = data;
      action.step = 4,
      action.save();
      return replyMessage(event.replyToken, [
        {
          "type": "flex",
          "altText": "Flex Message",
          "contents": {
            "type": "bubble",
            "header": {
              "type": "box",
              "layout": "vertical",
              "contents": [
                {
                  "type": "text",
                  "text": "ข้อมูลถูกต้องมั๊ย?",
                  "align": "center"
                }
              ]
            },
            "body": {
              "type": "box",
              "layout": "vertical",
              "contents": [
                {
                  "type": "box",
                  "layout": "baseline",
                  "contents": [
                    {
                      "type": "text",
                      "text": "ชื่อ",
                      "flex": 3,
                      "weight": "bold",
                      "color": "#555555"
                    },
                    {
                      "type": "text",
                      "text": data.name,
                      "flex": 6
                    }
                  ]
                },
                {
                  "type": "box",
                  "layout": "baseline",
                  "contents": [
                    {
                      "type": "text",
                      "text": "รายละเอียด",
                      "flex": 3,
                      "weight": "bold",
                      "color": "#555555"
                    },
                    {
                      "type": "text",
                      "text": data.detail,
                      "flex": 6
                    }
                  ]
                },
                {
                  "type": "box",
                  "layout": "baseline",
                  "contents": [
                    {
                      "type": "text",
                      "text": "แต้มที่ใช้",
                      "flex": 3,
                      "weight": "bold",
                      "color": "#555555"
                    },
                    {
                      "type": "text",
                      "text": data.redeempoint,
                      "flex": 6
                    }
                  ]
                }
              ]
            },
            "footer": {
              "type": "box",
              "layout": "horizontal",
              "contents": [
                {
                  "type": "button",
                  "action": {
                    "type": "message",
                    "label": "ถูกต้อง",
                    "text": "ถูกต้อง",
                  },
                  "margin": "xs",
                  "style": "primary"
                },
                {
                  "type": "button",
                  "action": {
                    "type": "message",
                    "label": "ยกเลิก",
                    "text": "ยกเลิก",
                  },
                  "margin": "xs",
                  "style": "secondary"
                }
              ]
            }
          }
        }
      ]);
    } else {
      return replyMessage(event.replyToken, [{ type: 'text', text: 'ข้อมูลไม่ถูกต้อง โปรดพิมชื่อเล่นของคุณอีกครั้ง!' }, { type: 'text', text: 'อายุ' }]);
    }
  }

  const confirmStep = async () => {
    if(event.type === 'message' && event.message.type === 'text') {
      if (event.message.text === 'ถูกต้อง') {
        const reward = await models.reward.create(action.data)
        action.step = 5,
        action.success = true;
        action.save();
        return replyMessage(event.replyToken, [
          { type: 'text', text: 'สำเร็จแล้ว' }
        ]);
      } else if (event.message.text === 'ยกเลิก') {
        action.step = 5,
        action.success = true;
        action.save();
        return replyMessage(event.replyToken, [actionMenu('addReward')]);
      } else {
        return replyMessage(event.replyToken, [{ type: 'text', text: 'บางอย่างเกิดผิดพลาด!' }]);
      }
    } else {
      return replyMessage(event.replyToken, [{ type: 'text', text: 'ข้อมูลไม่ถูกต้อง โปรดพิมชื่อเล่นของคุณอีกครั้ง!' }, { type: 'text', text: 'อายุ' }]);
    }
  }

  try {
    if (action) {
      switch (action.step) {
        case 0:
          return introStep();
          break;
        case 1:
          return rewardNameStep();
          break;
        case 2:
          return detailStep();
          break;
        case 3:
          return redeemPointNameStep();
          break;
        case 4:
          return confirmStep();
          break;
        default:
          action.step = -1;
          action.success = true;
          action.save();
          break;
      }
    } else if (user.user && user.user.shop) {
      const newAction = await models.action.create({
        job: 'addReward',
        success: false,
        step: 0,
        line_user_id: user.id,
      });
      introStep(newAction);
    } else {
      return replyMessage(event.replyToken, { type: 'text', text: 'บางอย่างผิดพลาด โปรดมั่นใจว่าคุณลงทะเบียนร้านค้าแล้ว' });
    }
  } catch (e) {
    console.log(e);
  }
}
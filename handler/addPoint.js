const { client, replyMessage } = require('../helper');
const models = require('./../models');
const actionMenu = require('./../components/actionMenu');
const confirmBox = (title, tel, point, name, footer = true) => {
  let content = {
    "type": "bubble",
    "header": {
      "type": "box",
      "layout": "vertical",
      "contents": [
        {
          "type": "text",
          "text": title,
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
              "text": name,
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
              "text": "เบอร์",
              "flex": 3,
              "weight": "bold",
              "color": "#555555"
            },
            {
              "type": "text",
              "text": tel,
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
              "text": "แต้ม",
              "flex": 3,
              "weight": "bold",
              "color": "#555555"
            },
            {
              "type": "text",
              "text": `${point} แต้ม`,
              "flex": 6
            }
          ]
        }
      ]
    }
  };

  if(footer) {
    content = Object.assign(
      {},
      content,
      {
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
    );
  }
  
  const msg = {
    "type": "flex",
    "altText": "Flex Message",
    "contents": content,
  };
  return msg;
};
module.exports = async (event, action, user) => {
  const introStep = (newAction) => {
    // introduce
    const introAction = newAction || action;
    introAction.step = 1;
    introAction.save();
    return replyMessage(event.replyToken, [
      { type: 'text', text: 'เพิ่มแต้มให้กับลูกค้าเลย!' },
      {
        type: 'text',
        text: 'เบอร์โทรศัพท์ที่จะเพิ่ม',
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

  const telStep = async () => {
    if(event.type === 'message' && event.message.type === 'text') {
      const customer = await models.user.findOne({
        where: {
          tel: event.message.text.trim(),
        }
      });
      if(customer) {
        // const [pointcard, created] = await models.line_user.findOrCreate({
        //   where: {
        //     shop_id: user.user.shop.id,
        //     user_id: customer.id,
        //   },
        //   include: [
        //     {
        //       model: models.user,
        //       as: 'user',
        //       include: {
        //         model: models.shop,
        //         as: 'shop',
        //       }
        //     }
        //   ],
        //   defaults: {
        //     lineid: event.source.userId,
        //   }
        // })
        let data = action.data || {};
        data = Object.assign(data, { user_id: customer.id, shop_id: user.user.shop.id, name: customer.nickname, tel: event.message.text.trim() });
        action.data = data;
        action.step = 2,
        action.save();
        return replyMessage(event.replyToken, [
          {
            type: 'text',
            text: 'เพิ่มกี่แต้ม?',
            "quickReply": {
              "items": [
                {
                  "type": "action",
                  "action": {
                    "type": "message",
                    "label": "1 แต้ม",
                    "text": "1",
                  }
                },
                {
                  "type": "action",
                  "action": {
                    "type": "message",
                    "label": "2 แต้ม",
                    "text": "2",
                  }
                },
                {
                  "type": "action",
                  "action": {
                    "type": "message",
                    "label": "3 แต้ม",
                    "text": "3",
                  }
                },
                {
                  "type": "action",
                  "action": {
                    "type": "message",
                    "label": "4 แต้ม",
                    "text": "4",
                  }
                },
                {
                  "type": "action",
                  "action": {
                    "type": "message",
                    "label": "5 แต้ม",
                    "text": "5",
                  }
                },
                {
                  "type": "action",
                  "action": {
                    "type": "message",
                    "label": "6 แต้ม",
                    "text": "6",
                  }
                }
              ]
            }
          }
        ]);
      } else {
        action.success = true;
        action.save();
        return replyMessage(event.replyToken, [
          { type: 'text', text: 'เบอร์นี้ยังไม่ได้ลงทะเบียนครับ?' }
        ]);
      }
    } else {
      return replyMessage(event.replyToken, [{ type: 'text', text: 'ข้อมูลไม่ถูกต้อง โปรดพิมชื่อรางวัลของคุณอีกครั้ง!' }, { type: 'text', text: 'ชื่อเล่น' }]);
    }
  }

  const pointStep = () => {
    if(event.type === 'message' && event.message.type === 'text' && !isNaN(event.message.text)) {
      let data = action.data || {};
      data = Object.assign(data, { point: event.message.text});
      action.data = data;
      action.step = 3,
      action.save();
      const { tel, point, name } = data;
      return replyMessage(event.replyToken, [
        confirmBox('เพิ่มคะแนน ข้อมูลถูกต้องมั๊ย?', tel, point, name)
      ]);
    } else {
      return replyMessage(event.replyToken, [{ type: 'text', text: 'ข้อมูลไม่ถูกต้อง โปรดพิมรายละเอียดของคุณอีกครั้ง!' }, { type: 'text', text: 'ชื่อเล่น' }]);
    }
  }

  const confirmStep = async () => {
    if(event.type === 'message' && event.message.type === 'text') {
      if (event.message.text === 'ถูกต้อง') {
        const [user_card, created] = await models.user_card.findOrCreate({
          where: {
            shop_id: action.data.shop_id,
            user_id: action.data.user_id,
          },
          defaults: action.data
        })
        if(!created) {
          user_card.point = user_card.point + parseInt(action.data.point, 10);
          user_card.save();
        }
        await models.transection.create(action.data);
        action.step = 4,
        action.success = true;
        action.save();
        return replyMessage(event.replyToken, [
          confirmBox('บัตรสะสมแต้ม', action.data.tel, user_card.point, action.data.name, false),
          { type: 'text', text: 'สำเร็จแล้ว' }
        ]);
      } else if (event.message.text === 'ยกเลิก') {
        action.step = 4,
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
          return telStep();
          break;
        case 2:
          return pointStep();
          break;
        case 3:
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
        job: 'addPoint',
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
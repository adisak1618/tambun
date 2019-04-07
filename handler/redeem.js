const queryString = require('query-string');
const { client, replyMessage } = require('../helper');
const models = require('./../models');
const actionMenu = require('./../components/actionMenu');

const caroselMsg = (data) => {
  console.log('Raw data', data);
  let dataList = [
    {
      "type": "bubble",
      "body": {
        "type": "box",
        "layout": "vertical",
        "spacing": "sm",
        "contents": [
          {
            "type": "text",
            "text": "เลือกรางวัล",
            "size": "xl",
            "weight": "bold",
            "wrap": true
          },
          {
            "type": "text",
            "text": "เลือกรางวัลที่ต้องการหรือยกเลิก"
          }
        ]
      },
      "footer": {
        "type": "box",
        "layout": "vertical",
        "spacing": "sm",
        "contents": [
          {
            "type": "button",
            "action": {
              "type": "message",
              "label": "ยกเลิก",
              "text": "ยกเลิก"
            },
            "color": "#14173D",
            "style": "primary"
          }
        ]
      }
    }
  ];

  const rewardData = data.map(({ name, detail, id, redeempoint }, index) => {
    return {
      "type": "bubble",
      "body": {
        "type": "box",
        "layout": "vertical",
        "spacing": "sm",
        "contents": [
          {
            "type": "text",
            "text": `${index + 1}. ${name}`,
            "size": "xl",
            "weight": "bold",
            "wrap": true
          },
          {
            "type": "text",
            "text": detail,
            "flex": 0,
            "margin": "md",
            "size": "md",
            "wrap": true
          }
        ]
      },
      "footer": {
        "type": "box",
        "layout": "vertical",
        "spacing": "sm",
        "contents": [
          {
            "type": "button",
            "action": {
              "type": "postback",
              "label": "เลือก",
              "displayText": `เลือก ${name}`,
              "data": `id=${id}&point=${redeempoint}&name=${name}`,
            },
            "flex": 2,
            "style": "secondary"
          }
        ]
      }
    };
  });

  let msg = {
    "type": "flex",
    "altText": "Flex Message",
    "contents": {
      "type": "carousel",
      "contents": [...dataList, ...rewardData],
    }
  };
  console.log('MSSG', msg);
  return msg;
}
module.exports = async (event, action, user) => {
  const introStep = (newAction) => {
    // introduce
    const introAction = newAction || action;
    introAction.step = 1;
    introAction.save();
    return replyMessage(event.replyToken, [
      { type: 'text', text: 'แลกของรางวัลเลย!' },
      {
        type: 'text',
        text: 'เบอร์ไหน',
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

  const CustomerTelStep = async () => {
    if(event.type === 'message' && event.message.type === 'text') {
      const customerTel = event.message.text.trim();
      const customer = await models.user.findOne({
        where: {
          tel: customerTel,
        }
      });
      const rewardData = await models.reward.findAll({
        where: {
          shop_id: user.user.shop.id,
        }
      });
      console.log('rewardData', rewardData);
      console.log('caroselMsg',  caroselMsg(rewardData));
      let data = action.data || {};
      if(customer) {
        data = Object.assign(data, { tel: customerTel, shop_id: user.user.shop.id, user_id: customer.id });
        action.data = data;
        action.step = 2,
        action.save();
        return replyMessage(event.replyToken, caroselMsg(rewardData));
      } else {
        data = Object.assign(data, { tel: customerTel});
        console.log('WTFFFF2', action);
        action.data = data;
        action.success = true,
        action.save();
        console.log('data', action.success);
        const msg = {
          "type": "flex",
          "altText": "Flex Message",
          "contents": {
            "type": "bubble",
            "direction": "ltr",
            "header": {
              "type": "box",
              "layout": "vertical",
              "contents": [
                {
                  "type": "text",
                  "text": "ผลการค้นหา",
                  "align": "center"
                }
              ]
            },
            "body": {
              "type": "box",
              "layout": "vertical",
              "contents": [
                {
                  "type": "text",
                  "text": "ไม่พบข้อมูลผู้ใช้",
                  "align": "center"
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
                    "type": "postback",
                    "label": "ลองใหม่",
                    "displayText": "แลกของรางวัล",
                    "data": "redeemReward"
                  },
                  "margin": "sm",
                  "style": "primary"
                },
                {
                  "type": "button",
                  "action": {
                    "type": "message",
                    "label": "ยกเลิก",
                    "text": "ยกเลิก"
                  },
                  "margin": "sm",
                  "style": "secondary"
                }
              ]
            }
          }
        };
        return replyMessage(event.replyToken, [msg]);
      }
    } else {
      return replyMessage(event.replyToken, [{ type: 'text', text: 'ข้อมูลไม่ถูกต้อง โปรดพิมชื่อรางวัลของคุณอีกครั้ง!' }, { type: 'text', text: 'ชื่อเล่น' }]);
    }
  }

  const confirmStep = async () => {
    if(event.type === 'postback') {
      try {
        const { id: rewardID, point, name } = queryString.parse(event.postback.data)
        let data = action.data || {};
        data = Object.assign(data, { reward_id: rewardID, point: point });
        action.data = data;
        action.step = 3,
        action.save();
        console.log('data', data.shop_id);
        const customer = await models.user.findOne({
          where: {
            id: data.user_id,
          }
        });
        const user_card = await models.user_card.findOne({
          where: {
            user_id: data.user_id,
            shop_id: data.shop_id,
          },
        });
        console.log('condition123', data.shop_id);
        console.log('customer123', customer);
        console.log('user_card', user_card);
        if (!user_card) {
          action.success = true;
          action.save();
          return replyMessage(event.replyToken, [
            { type: 'text', text: `คะแนนไม่พอ รางวัลนี้ต้องการ ${data.point} คะแนน` }
          ]);
        }
        if (user_card.point < data.point) {
          action.success = true;
          action.save();
          return replyMessage(event.replyToken, [
            { type: 'text', text: `คะแนนไม่พอ รางวัลนี้ต้องการ ${data.point} คะแนน` }
          ]);
        }
        // await models.redeem.create(data);
        return replyMessage(event.replyToken, [
          {
            "type": "flex",
            "altText": "Flex Message",
            "contents": {
              "type": "bubble",
              "direction": "ltr",
              "body": {
                "type": "box",
                "layout": "vertical",
                "contents": [
                  {
                    "type": "text",
                    "text": "ยืนยันความถูกต้อง!",
                    "size": "xl",
                    "align": "center",
                    "weight": "bold"
                  },
                  {
                    "type": "box",
                    "layout": "horizontal",
                    "contents": [
                      {
                        "type": "text",
                        "text": "ชื่อ",
                        "flex": 1,
                        "weight": "bold"
                      },
                      {
                        "type": "text",
                        "text": customer.nickname,
                        "flex": 3
                      }
                    ]
                  },
                  {
                    "type": "box",
                    "layout": "horizontal",
                    "contents": [
                      {
                        "type": "text",
                        "text": "เบอร์",
                        "flex": 1,
                        "weight": "bold"
                      },
                      {
                        "type": "text",
                        "text": customer.tel,
                        "flex": 3
                      }
                    ]
                  },
                  {
                    "type": "box",
                    "layout": "horizontal",
                    "contents": [
                      {
                        "type": "text",
                        "text": "รางวัล",
                        "flex": 1,
                        "weight": "bold"
                      },
                      {
                        "type": "text",
                        "text": name,
                        "flex": 3
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
                      "text": "ถูกต้อง"
                    },
                    "margin": "sm",
                    "style": "primary"
                  },
                  {
                    "type": "button",
                    "action": {
                      "type": "message",
                      "label": "ยกเลิก",
                      "text": "ยกเลิก"
                    },
                    "margin": "sm",
                    "style": "secondary"
                  }
                ]
              }
            }
          }
        ]);
      } catch (error) {
        console.log('error', error);
        action.success = true;
        action.save();
        return replyMessage(event.replyToken, [{ type: 'text', text: 'ยกเลิกแล้ว2' }]);
      }
    } else {
      action.success = true;
      action.save();
      return replyMessage(event.replyToken, [{ type: 'text', text: 'ยกเลิกแล้ว' }]);
    }
  }

  const completeStep = async () => {
    if(event.type === 'message' && event.message.type === 'text' && event.message.text === 'ถูกต้อง') {
      try {
        let data = action.data || {};
        const user_card = await models.user_card.findOne({
          where: {
            user_id: data.user_id,
            shop_id: data.shop_id,
          },
        });
        user_card.point = user_card.point - Number(data.point);
        user_card.save()
        await models.redeem.create(data);
        action.success = true;
        action.save();
        return replyMessage(event.replyToken, [{ type: 'text', text: 'สำเร็จ' }]);
      } catch (error) {
        action.success = true;
        action.save();
        return replyMessage(event.replyToken, [{ type: 'text', text: 'บางอย่างผิดพลาด' }]);
      }
    } else {
      action.success = true;
      action.save();
      return replyMessage(event.replyToken, [{ type: 'text', text: 'ยกเลิกแล้ว' }]);
    }
  }
  

  try {
    if (action) {
      switch (action.step) {
        case 0:
          return introStep();
          break;
        case 1:
          return CustomerTelStep();
          break;
        case 2:
          return confirmStep();
          break;
        case 3:
          return completeStep();
          break;
        default:
          action.step = -1;
          action.success = true;
          action.save();
          break;
      }
    } else if (user.user && user.user.shop) {
      const rewardData = await models.reward.findAll({
        where: {
          shop_id: user.user.shop.id,
        }
      });
      if(rewardData.length === 0) {
        // not have reward!
        return replyMessage(event.replyToken, [
          { type: 'text', text: 'ยังไม่มีของรางวัลให้แลก เพิ่มของรางวัลก่อนมั๊ย?' },
          actionMenu('addReward'),
        ]);
      } else {
        const newAction = await models.action.create({
          job: 'redeemReward',
          success: false,
          step: 0,
          line_user_id: user.id,
        });
        introStep(newAction);
      }
    } else {
      return replyMessage(event.replyToken, { type: 'text', text: 'บางอย่างผิดพลาด โปรดมั่นใจว่าคุณลงทะเบียนร้านค้าแล้ว' });
    }
  } catch (e) {
    console.log(e);
  }
}
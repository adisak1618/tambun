const { client, replyMessage } = require('../helper');
const models = require('./../models');
const actionMenu = require('./../components/actionMenu');
// const mainMenuMsg = require('./../components/message/mainmenu');

module.exports = async (event, action, user) => {
  const introStep = (newAction) => {
    // introduce
    const introAction = newAction || action;
    introAction.step = 1;
    introAction.save();
    return replyMessage(event.replyToken, [
      { type: 'text', text: 'เริ่มลงทะเบียนกันเลย!' },
      {
        type: 'text',
        text: 'ชื่อเล่น',
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

  const nicknameStep = () => {
    // colect nickname
    if(event.type === 'message' && event.message.type === 'text') {
      let data = action.data || {};
      data = Object.assign(data, { nickname: event.message.text});
      action.data = data;
      action.step = 2,
      action.save();
      return replyMessage(event.replyToken, [
        { type: 'text', text: 'โปรดพิม เบอร์โทรศัพท์มือถือ!' }
      ]);
    } else {
      return replyMessage(event.replyToken, [{ type: 'text', text: 'ข้อมูลไม่ถูกต้อง โปรดพิมชื่อเล่นของคุณอีกครั้ง!' }, { type: 'text', text: 'ชื่อเล่น' }]);
    }
  }

  const telStep = () => {
    // colect tel
    if(event.type === 'message' && event.message.type === 'text') {
      let data = action.data || {};
      data = Object.assign(data, { tel: event.message.text});
      action.data = data;
      action.step = 3,
      action.save();
      return replyMessage(event.replyToken, [
        { type: 'text', text: 'อายุของคุณ' }
      ]);
    } else {
      return replyMessage(event.replyToken, [{ type: 'text', text: 'ข้อมูลไม่ถูกต้อง โปรดพิมชื่อเล่นของคุณอีกครั้ง!' }, { type: 'text', text: 'อายุ' }]);
    }
  }

  const ageStep = () => {
    // colect age
    if(event.type === 'message' && event.message.type === 'text' && !isNaN(event.message.text)) {
      let data = action.data || {};
      data = Object.assign(data, { estimate_age: event.message.text});
      action.data = data;
      action.step = 4,
      action.save();
      return replyMessage(event.replyToken, [
        {
          type: 'text',
          text: 'เพศ',
          "quickReply": {
            "items": [
              {
                "type": "action",
                "action": {
                  "type": "message",
                  "label": "ชาย",
                  "text": "ชาย",
                }
              },
              {
                "type": "action",
                "action": {
                  "type": "message",
                  "label": "หญิง",
                  "text": "หญิง",
                }
              },
              {
                "type": "action",
                "action": {
                  "type": "message",
                  "label": "อื่นๆ",
                  "text": "อื่นๆ",
                }
              }
            ]
          }
        }
      ]);
    } else {
      return replyMessage(event.replyToken, [{ type: 'text', text: 'ข้อมูลไม่ถูกต้อง โปรดพิมอายุของคุณอีกครั้ง! เป็นตัวเลข' }, { type: 'text', text: 'อายุ' }]);
    }
  }


  // age error response
  const genderError = {
    type: 'text',
    text: 'ข้อมูลไม่ถูกต้อง โปรดระบุเพศของคุณ "ชาย" "หญิง" หรือ "อื่นๆ"',
    "quickReply": {
      "items": [
        {
          "type": "action",
          "action": {
            "type": "message",
            "label": "ชาย",
            "text": "ชาย",
          }
        },
        {
          "type": "action",
          "action": {
            "type": "message",
            "label": "หญิง",
            "text": "หญิง",
          }
        },
        {
          "type": "action",
          "action": {
            "type": "message",
            "label": "อื่นๆ",
            "text": "อื่นๆ",
          }
        }
      ]
    }
  }
  const genderStep = async () => {
    // colect age
    if(event.type === 'message' && event.message.type === 'text') {
      const mappingData = [
        {
          display: 'ชาย',
          value: 'm'
        },
        {
          display: 'หญิง',
          value: 'f'
        },
        {
          display: 'อื่นๆ',
          value: 'o'
        }
      ]
      const foundValue = mappingData.find((item) => item.display.indexOf(event.message.text.trim()) >= 0)
      if (foundValue) {
        let data = action.data || {};
        data = Object.assign(data, { gender: foundValue.value}, { follow: true });
        action.data = data;
        action.step = 5,
        action.success = true,
        action.save();
        const newUser = await models.user.create(data)
        user.user_id = newUser.id;
        user.save();
        let replyData = [
          { type: 'text', text: 'สำเร็จแล้ว คุณสามารถใช้ เบอร์โทรศัพท์ของคุณสะสมแต้มกับร้านที่ร่วมรายการได้เลย' },
        ];
        console.log('action.next', action.next);
        if (action.next) {
          replyData = [...replyData, actionMenu(action.next)];
        }
        console.log('replyData', replyData);
        console.log('actionMenu(action.next)', actionMenu(action.next))
        return replyMessage(event.replyToken, replyData);
      } else {
        return replyMessage(event.replyToken, genderError);
      }
    } else {
      return replyMessage(event.replyToken, genderError);
    }
  }

  try {
    if (user.user) {
      return replyMessage(event.replyToken, { type: 'text', text: 'คุณได้สมัครสมาชิคเรียบร้อยแล้ว' });
      // const newAction = await models.action.create({
      //   job: 'registerUser',
      //   success: false,
      //   step: 0,
      //   line_user_id: user.id,
      //   next: 'registerShop',
      // });
      // registerUser(event, newAction, user)
    } else if (!action) {
      const newAction = await models.action.create({
        job: 'registerUser',
        success: false,
        step: 0,
        line_user_id: user.id,
      });
      introStep(newAction);
    } else {
      switch (action.step) {
        case 0:
          return introStep();
          break;
        case 1:
          return nicknameStep();
          break;
        case 2:
          return telStep();
          break;
        case 3:
          return ageStep();
          break;
        case 4:
          return genderStep();
          break;
        default:
          action.step = -1;
          action.success = true;
          action.save();
          break;
      }
    }
  } catch (e) {
    console.log(e);
  }
}
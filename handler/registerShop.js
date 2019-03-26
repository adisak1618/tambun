const { client, replyMessage } = require('../helper');
const registerUser = require('./registerUser');
const models = require('./../models');

module.exports = async (event, action, user) => {
  const introStep = (newAction) => {
    // introduce
    const introAction = newAction || action;
    introAction.step = 1;
    introAction.save();
    return replyMessage(event.replyToken, [
      { type: 'text', text: 'เริ่มลงทะเบียนร้านค้า!' },
      {
        type: 'text',
        text: 'ชื่อร้าน',
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

  const shopNameStep = () => {
    // colect nickname
    if(event.type === 'message' && event.message.type === 'text') {
      let data = action.data || {};
      data = Object.assign(data, { name: event.message.text});
      action.data = data;
      action.step = 2,
      action.save();
      return replyMessage(event.replyToken, [
        { type: 'text', text: 'รายละเอียดโดยย่อ เช่น เป็นร้านอะไร ขายอะไรบ้าง' }
      ]);
    } else {
      return replyMessage(event.replyToken, [{ type: 'text', text: 'ข้อมูลไม่ถูกต้อง โปรดพิมชื่อเล่นของคุณอีกครั้ง!' }, { type: 'text', text: 'ชื่อเล่น' }]);
    }
  }

  const shortDescriptionStep = async () => {
    // colect tel
    if(event.type === 'message' && event.message.type === 'text') {
      let data = action.data || {};
      data = Object.assign(data, { shortdescription: event.message.text});
      action.data = data;
      action.step = 3,
      action.save();
      const shop = await models.shop.create(data)
      return replyMessage(event.replyToken, [
        { type: 'text', text: 'สำเร็จแล้ว' }
      ]);
    } else {
      return replyMessage(event.replyToken, [{ type: 'text', text: 'ข้อมูลไม่ถูกต้อง โปรดพิมชื่อเล่นของคุณอีกครั้ง!' }, { type: 'text', text: 'อายุ' }]);
    }
  }


  try {
    if (!user.user) {
      const newAction = await models.action.create({
        job: 'registerUser',
        success: false,
        step: 0,
        line_user_id: user.id,
        next: 'registerShop',
      });
      registerUser(event, newAction, user)
    } else if (!action) {
      const newAction = await models.action.create({
        job: 'registerShop',
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
          return shopNameStep();
          break;
        case 2:
          return shortDescriptionStep();
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
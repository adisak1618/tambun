const { client, replyMessage } = require('../helper');
const models = require('./../models');
const actionMenu = require('./../components/actionMenu');

module.exports = async (event, action, user) => {
  try {
    console.log('h2o', user.user);
    if (user.user) {
      const user_card = await models.user_card.findAll({
        where: {
          user_id: user.user.id,
        },
        limit: 9,
        include: [
          {
            model: models.shop,
            as: 'shop',
          }
        ],
      });
      console.log('myPointData', user_card);
      return replyMessage(event.replyToken, { type: 'text', text: 'yoo!' });
    } else {
      return replyMessage(event.replyToken, { type: 'text', text: '222บางอย่างผิดพลาด โปรดมั่นใจว่าคุณลงทะเบียนร้านค้าแล้ว' });
    }
  } catch (e) {
    console.log(e);
  }
}
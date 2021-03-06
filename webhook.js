const { replyMessage } = require('./helper');
const models = require('./models');
const handler = require('./handler');
const mainMenu = require('./components/menu/mainmenu');
const userMenuMsg = require('./components/menu/userMenu');
const testmenu = require('./components/actionMenu');
// create LINE SDK client

module.exports = async (event) => {
  console.log('event log', event);
  // return replyMessage(event.replyToken, [
  const [user, created] = await models.line_user.findOrCreate({
    where: {
      lineid: event.source.userId,
    },
    include: [
      {
        model: models.user,
        as: 'user',
        include: {
          model: models.shop,
          as: 'shop',
        }
      }
    ],
    defaults: {
      lineid: event.source.userId,
    }
  })

  if (event.type === 'follow') {
    const echo = [{ type: 'text', text: 'สวัสดี :)' }, mainMenu(user)];
    return replyMessage(event.replyToken, echo);
  } else {
    if (user.path !== "") {
      return null;
    }
    var custom_order = Object.keys(handler).reverse();
    const data = await models.action.findAndCountAll({
      where: {
        success: false,
      },
      // raw: true,
    })

    data.rows.sort((back, front) => {
      const backorder = custom_order.indexOf(back.job);
      const frontorder = custom_order.indexOf(front.job);
      return frontorder - backorder;
    });

    if(data.count > 0) {
      const action = data.rows[0];
      return handler[action.job](event, action, user)
    } else {
      if(event.type === 'postback') {
        const name = event.postback.data;
        if (name in handler) {
          // const action = await models.action.create({
          //   job: name,
          //   success: false,
          //   step: 0,
          //   line_user_id: user.id,
          // })
          handler[name](event, null, user)
        } else {
          return replyMessage(event.replyToken, [{ type: 'text', text: 'บางอย่างเกิดผิดพลาด' }, mainMenu(user)]);
        }
      } else {
        return replyMessage(event.replyToken, mainMenu(user));
      }
    }
  }
}
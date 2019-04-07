const createMenu = (title, detail, action) => {
  return {
    "type": "flex",
    "altText": "Flex Message",
    "contents": {
      "type": "bubble",
      "body": {
        "type": "box",
        "layout": "vertical",
        "contents": [
          {
            "type": "text",
            "text": title,
            "size": "xl",
            "align": "center",
            "weight": "bold"
          },
          {
            "type": "box",
            "layout": "vertical",
            "spacing": "sm",
            "margin": "lg",
            "contents": [
              {
                "type": "text",
                "text": detail,
                "wrap": true
              }
            ]
          }
        ]
      },
      "footer": {
        "type": "box",
        "layout": "vertical",
        "flex": 0,
        "spacing": "sm",
        "contents": [
          {
            "type": "button",
            "action": {
              "type": "uri",
              "label": "เมนูหลัก",
              "uri": "https://linecorp.com"
            },
            "height": "sm",
            "style": "link"
          },
          {
            "type": "button",
            "action": {
              "type": "postback",
              "label": "เริ่มเลย",
              "data": action,
              "displayText": "เริ่มลงทะเบียนร้านค้า"
            },
            "style": "primary"
          }
        ]
      }
    }
  };
}

module.exports = (action) => {
  const menuList = {
    registerShop: {
      title: 'เริ่มลงทะเบียนร้านค้า',
      detail: 'สร้างความสัมพันธุ์กับลูกค้าของคุณผ่านไลน์ด้วยวิธีง่ายสุดๆ กับเรา'
    },
    addReward: {
      title: 'เพิ่มของรางวัล',
      detail: 'ของรางวัลสามารถแลกได้ด้วยแต้มของลูกค้าตามจำนวนแต้มที่กำหนด'
    }
  };
  if(action in menuList) {
    const { title, detail } = menuList[action];
    return createMenu(title, detail, action);
  }
}
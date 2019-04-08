module.exports = (user) => {
  let footer = [
    {
      "type": "button",
      "action": {
        "type": "uri",
        "label": "ข้อมูลส่วนตัว",
        "uri": "https://linecorp.com"
      },
      "style": "secondary"
    },
    {
      "type": "button",
      "action": {
        "type": "postback",
        "label": "บัตรสะสมแต้มของฉัน",
        "displayText": "บัตรสะสมแต้มของฉัน",
        "data": "myPoint"
      },
      "color": "#131347",
      "margin": "md",
      "style": "primary"
    }
  ];
  if(user.user && user.user.shop) {
    footer = [
      ...footer, 
      {
        "type": "separator",
        "margin": "md"
      },
      {
        "type": "button",
        "action": {
          "type": "postback",
          "label": "ร้านค้าของคุณ",
          "displayText": "ไปร้านค้าของคุณ",
          "data": "shopMenu"
        },
        "color": "#131347",
        "margin": "md",
        "style": "primary"
      }
    ]
  }
  return {
    "type": "bubble",
    "hero": {
      "type": "image",
      "url": "https://i.imgur.com/9WWUIHR.jpg",
      "size": "full",
      "aspectRatio": "20:13",
      "aspectMode": "cover",
      "action": {
        "type": "uri",
        "label": "Action",
        "uri": "https://linecorp.com/"
      }
    },
    "body": {
      "type": "box",
      "layout": "vertical",
      "spacing": "md",
      "contents": [
        {
          "type": "text",
          "text": "ตรวจสอบคะแนน",
          "size": "xl",
          "align": "center",
          "weight": "bold"
        },
        {
          "type": "text",
          "text": "คุณสามารถตรวจสอบคะแนนของแต่ละร้านที่คุณใช้บริการและแก้ไขข้อมูลส่วนตัวได้",
          "size": "md",
          "align": "center",
          "wrap": true
        }
      ]
    },
    "footer": {
      "type": "box",
      "layout": "vertical",
      "flex": 1,
      "contents": footer,
    }
  };
}
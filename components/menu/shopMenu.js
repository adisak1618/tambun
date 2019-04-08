module.exports = {
  "type": "bubble",
  "body": {
    "type": "box",
    "layout": "vertical",
    "spacing": "md",
    "contents": [
      {
        "type": "text",
        "text": "เมนูร้านค้า",
        "size": "xl",
        "align": "center",
        "weight": "bold"
      },
      {
        "type": "text",
        "text": "เรายินดีรับคำติดชมจากร้านค้าเป็นอย่างมาก หากมีเรื่องใดที่เราจะช่วยได้โปรดติดต่อเราได้ที่",
        "size": "md",
        "align": "center",
        "wrap": true
      },
      {
        "type": "button",
        "action": {
          "type": "uri",
          "label": "เบอร์: 0993266161",
          "uri": "https://linecorp.com"
        },
        "style": "primary"
      },
      {
        "type": "button",
        "action": {
          "type": "uri",
          "label": "facebook",
          "uri": "https://linecorp.com"
        },
        "color": "#3B5998",
        "style": "primary"
      },
      {
        "type": "separator"
      }
    ]
  },
  "footer": {
    "type": "box",
    "layout": "vertical",
    "contents": [
      {
        "type": "text",
        "text": "ร้านค้าเริ่มใช้งานเราได้จาก 3 เมนูนี้",
        "align": "center"
      },
      {
        "type": "button",
        "action": {
          "type": "postback",
          "label": "เพิ่มของรางวัล",
          "displayText": "เพิ่มของรางวัล",
          "data": "addReward"
        },
        "margin": "md",
        "style": "secondary"
      },
      {
        "type": "button",
        "action": {
          "type": "postback",
          "label": "แลกของรางวัล",
          "displayText": "แลกของรางวัล",
          "data": "redeemReward"
        },
        "margin": "md",
        "style": "secondary"
      },
      {
        "type": "button",
        "action": {
          "type": "postback",
          "label": "เพิ่มคะแนน",
          "displayText": "เพิ่มคะแนน",
          "data": "addPoint"
        },
        "color": "#131347",
        "margin": "md",
        "style": "primary"
      }
    ]
  }
};
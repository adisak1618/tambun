module.exports = {  
  "type": "flex",
  "altText": "this is a flex message",
  "contents": {
    "type": "carousel",
    "contents": [
      {
        "type": "bubble",
        "hero": {
          "type": "image",
          "size": "full",
          "aspectRatio": "20:13",
          "aspectMode": "cover",
          "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/01_5_carousel.png"
        },
        "body": {
          "type": "box",
          "layout": "vertical",
          "spacing": "sm",
          "contents": [
            {
              "type": "text",
              "text": "เริ่มสะสมแต้มกับเรา",
              "wrap": true,
              "weight": "bold",
              "size": "xl"
            },
            {
              "type": "box",
              "layout": "baseline",
              "contents": [
                {
                  "type": "text",
                  "text": "เพียงใส่ข้อมูลเกี่ยวเบอร์โทรคุณก็จะสามารถเก็บคะแนนของร้านต่างๆได้อย่างง่ายดาย",
                  "wrap": true,
                  "size": "md",
                  "flex": 0
                }
              ]
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
                "type": "uri",
                "label": "รายละเอียดเพิ่มเติม",
                "uri": "https://linecorp.com"
              }
            },
            {
              "type": "button",
              "style": "primary",
              "action": {
                "type": "postback",
                "label": "เริ่มเลย",
                "data":"registerUser",
                "displayText": "เริ่มลงทะเบียน สมาชิคใหม่"
              }
            }
          ]
        }
      },
      {
        "type": "bubble",
        "hero": {
          "type": "image",
          "size": "full",
          "aspectRatio": "20:13",
          "aspectMode": "cover",
          "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/01_6_carousel.png"
        },
        "body": {
          "type": "box",
          "layout": "vertical",
          "spacing": "sm",
          "contents": [
            {
              "type": "text",
              "text": "Metal Desk Lamp",
              "wrap": true,
              "weight": "bold",
              "size": "xl"
            },
            {
              "type": "box",
              "layout": "baseline",
              "flex": 1,
              "contents": [
                {
                  "type": "text",
                  "text": "$11",
                  "wrap": true,
                  "weight": "bold",
                  "size": "xl",
                  "flex": 0
                },
                {
                  "type": "text",
                  "text": ".99",
                  "wrap": true,
                  "weight": "bold",
                  "size": "sm",
                  "flex": 0
                }
              ]
            },
            {
              "type": "text",
              "text": "Temporarily out of stock",
              "wrap": true,
              "size": "xxs",
              "margin": "md",
              "color": "#ff5551",
              "flex": 0
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
              "flex": 2,
              "style": "primary",
              "color": "#aaaaaa",
              "action": {
                "type": "uri",
                "label": "Add to Cart",
                "uri": "https://linecorp.com"
              }
            },
            {
              "type": "button",
              "style": "primary",
              "action": {
                "type": "postback",
                "label": "ลงทะเบียนร้านค้า",
                "data":"registerShop",
                "displayText": "ลงทะเบียนร้านค้า"
              }
            }
          ]
        }
      }
    ]
  }
};
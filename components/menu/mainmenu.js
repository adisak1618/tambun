const userMenu = require('./userMenu');
const shopMenu = require('./shopMenu');

const mainMenuMsg = {
  "type": "flex",
  "altText": "Flex Message",
  "contents": {
    "type": "carousel",
    "contents": [
      {
        "type": "bubble",
        "hero": {
          "type": "image",
          "url": "https://i.imgur.com/e3BzVcc.jpg",
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
              "text": "เริ่มสะสมแต้มบุญ",
              "size": "xl",
              "align": "center",
              "weight": "bold"
            },
            {
              "type": "text",
              "text": "ไม่ต้องพกบัตร ไม่ต้องแสกน แค่บอกเบอร์โทรศัพท์ ก็สะสมคะแนนพร้อมติดตามโปรโมชั่นของร้านได้ ผ่าน line",
              "size": "md",
              "gravity": "center",
              "wrap": true
            }
          ]
        },
        "footer": {
          "type": "box",
          "layout": "vertical",
          "contents": [
            {
              "type": "button",
              "action": {
                "type": "postback",
                "label": "สมัครเลย",
                "displayText": "สมัครเลย",
                "data": "registerUser"
              },
              "color": "#131347",
              "style": "primary",
              "margin": "none",
            }
          ]
        }
      },
      {
        "type": "bubble",
        "direction": "ltr",
        "hero": {
          "type": "image",
          "url": "https://i.imgur.com/lu19F76.png",
          "align": "center",
          "gravity": "center",
          "size": "full",
          "aspectRatio": "1.91:1",
          "aspectMode": "fit"
        },
        "body": {
          "type": "box",
          "layout": "vertical",
          "contents": [
            {
              "type": "text",
              "text": "วิธีใช้งาน",
              "margin": "xxl",
              "size": "xl",
              "align": "center",
              "gravity": "center",
              "weight": "bold",
              "color": "#FFFFFF"
            },
            {
              "type": "text",
              "text": "3 ขั้นตอนง่าย",
              "align": "center",
              "gravity": "center",
              "color": "#FFFFFF"
            },
            {
              "type": "image",
              "url": "https://i.imgur.com/QC71LN4.png",
              "margin": "md",
              "size": "xxs"
            },
            {
              "type": "image",
              "url": "https://i.imgur.com/lu19F76.png",
              "size": "full",
              "aspectRatio": "1.91:1"
            }
          ]
        },
        "styles": {
          "hero": {
            "backgroundColor": "#131347"
          },
          "body": {
            "backgroundColor": "#131347"
          }
        }
      },
      {
        "type": "bubble",
        "hero": {
          "type": "image",
          "url": "https://i.imgur.com/bAANX4i.jpg",
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
              "text": "กรอกข้อมูล",
              "size": "xl",
              "align": "center",
              "weight": "bold"
            },
            {
              "type": "text",
              "text": "ตอบคำถามต่อไปนี้",
              "size": "md",
              "align": "center",
              "wrap": true
            },
            {
              "type": "separator"
            },
            {
              "type": "text",
              "text": "1. ชื่อเล่น",
              "flex": 2,
              "size": "md",
              "align": "center",
              "gravity": "center",
              "wrap": true
            },
            {
              "type": "text",
              "text": "2. เบอร์โทรศัพท์",
              "flex": 3,
              "size": "md",
              "align": "center",
              "gravity": "center",
              "wrap": true
            },
            {
              "type": "text",
              "text": "3. เพศ",
              "flex": 2,
              "size": "md",
              "align": "center",
              "gravity": "center",
              "wrap": true
            },
            {
              "type": "text",
              "text": "4. อายุ",
              "flex": 3,
              "size": "md",
              "align": "center",
              "gravity": "center",
              "wrap": true
            }
          ]
        }
      },
      {
        "type": "bubble",
        "hero": {
          "type": "image",
          "url": "https://i.imgur.com/kS4j58D.jpg",
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
              "text": "บอกเบอร์ เช็คแต้ม",
              "size": "xl",
              "align": "center",
              "weight": "bold"
            },
            {
              "type": "text",
              "text": "ซื้อของเสร็จแล้ว \"บอกเบอร์\" ที่ได้ลงทะเบียนไว้เพื่อสะสมแต้ม",
              "size": "md",
              "align": "center",
              "wrap": true
            },
            {
              "type": "separator",
              "margin": "xl"
            },
            {
              "type": "text",
              "text": "เช็คคะแนนได้จาก line (@tambun) กดที่เมนู \"บัตรสะสมแต้ม\"",
              "margin": "xl",
              "align": "center",
              "wrap": true
            }
          ]
        }
      },
      {
        "type": "bubble",
        "hero": {
          "type": "image",
          "url": "https://i.imgur.com/ESbxyG6.jpg",
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
              "text": "เช็คแต้ม บอกเบอร์",
              "size": "xl",
              "align": "center",
              "weight": "bold"
            },
            {
              "type": "text",
              "text": "เช็คคะแนนได้จาก line (@tambun) กดที่เมนู \"บัตรสะสมแต้ม\"",
              "margin": "xl",
              "align": "center",
              "wrap": true
            },
            {
              "type": "separator",
              "margin": "xl"
            },
            {
              "type": "text",
              "text": "คะแนนครบแล้ว แลกของรางวัลง่ายๆ แค่ \"บอกเบอร์\" โทรของคุณกับร้านค้า",
              "size": "md",
              "align": "center",
              "wrap": true
            }
          ]
        }
      },
      {
        "type": "bubble",
        "hero": {
          "type": "image",
          "url": "https://i.imgur.com/AGt0dUJ.jpg",
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
              "text": "เข้าใจลูกค้ามากขึ้น",
              "size": "xl",
              "align": "center",
              "weight": "bold"
            },
            {
              "type": "text",
              "text": "สร้างความสัมพันธุ์กับลูกค้า เพิ่มยอดขาย เก็บข้อมูล เข้าใจลูกค้ามากขึ้น และต่อยอด",
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
          "contents": [
            {
              "type": "button",
              "action": {
                "type": "uri",
                "label": "รายละเอียดเพิ่มเติม",
                "uri": "https://linecorp.com"
              },
              "style": "secondary"
            },
            {
              "type": "button",
              "action": {
                "type": "postback",
                "label": "เพิ่มร้านของคุณ",
                "displayText": "สมัครเลย",
                "data": "registerShop"
              },
              "color": "#131347",
              "margin": "md",
              "style": "primary"
            }
          ]
        }
      }
    ]
  }
};

module.exports = (user) => {
  if (user.user) {
    return {
      "type": "flex",
      "altText": "Flex Message",
      "contents": {
        "type": "carousel",
        "contents": [userMenu(user)],
      }
    };
  } else {
    return mainMenuMsg;
  }
}
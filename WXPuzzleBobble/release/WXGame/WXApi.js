
wx.getUserInfo({
  success: function (res) {
    var userInfo = res.userInfo
    var nickName = userInfo.nickName
    var avatarUrl = userInfo.avatarUrl
    var gender = userInfo.gender //性别 0：未知、1：男、2：女
    var province = userInfo.province
    var city = userInfo.city
    var country = userInfo.country
  }
})

let openDataContext = wx.getOpenDataContext()
let sharedCanvas = openDataContext.canvas

// openDataContext.postMessage({
//   text: 'hello',
//   year: (new Date()).getFullYear()
// })

openDataContext.postMessage({
  msgType:1,
})

// console.log(sharedCanvas.width);

setTimeout(function () {
  let canvas = wx.createCanvas()

  let context = canvas.getContext('2d')

  context.drawImage(sharedCanvas, 0, 0)
  console.log(sharedCanvas.width);

}, 1000);
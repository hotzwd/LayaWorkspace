let sharedCanvas;
let sharedContext;//共享离屏上下文

// let tempX, tempY, lastX, lastY;//临时记录位置
let currentLoadHeadCnt = 0;//当前加载完成头像个数
let infoList = [];//好友信息列表
let dataList;//托管数据列表
let rankType;//排行类型

let img; //背景
let centenrX = 0;//中心点X坐标
let centenrY = 0;//中心点X坐标

const STAST_HEIGHT = 10;//起始高度
const RANK_WIDTH = 0.1;//好友排行x值所在比例
const HEAD_ICON_WIDTH = 0.25;//头像框x值所在比例
const NICK_NAME_WIDTH = 0.42;//昵称x值所在比例
const COUNT_WIDTH = 0.85;//特戒数量x值所在比例
const SPACE_HEIGHT = 30;//间隔高度
const ICON_SIZE = 46;//头像大小 0、46、64、96、132
const ICON_GAP = ICON_SIZE +30; //头像间距


const FRIEND = 1;//好友排行
const GROUP = 2;//群组排行
const SCORE = 3;//发送分数


wx.onMessage(data => {

  console.log("收到主域消息:" + data);

  sharedCanvas = wx.getSharedCanvas();
  sharedContext = sharedCanvas.getContext('2d');
  centenrX = sharedCanvas.width / 2;
  centenrY = sharedCanvas.height / 2;

  // sharedContext.fillStyle = '#ffffff'
  sharedContext.fillStyle = 'red'
  // sharedContext.fillRect(0, 0, 500, 500)
  
  if (data.msgType == FRIEND) {//好友排行
    console.log("好友排行")
  
    // img = wx.createImage();
    // img.src = "game/img_dangqiandefen.png";
    // img.onload = drawBegin;
    // img.onabort = function () { console.log("加载失败") };

    // sendScore("123");
    getFriendRank();
  }
  else if (data.msgType == GROUP) {//群组排行

  }
  else if (data.msgType == SCORE) {//发送分数
    sendScore(data.score + "");
  }

  console.log("执行onMessage结束:");
})

//绘制文本
function drawBegin() {

  console.log("开始绘制:");
  //绘制背景
  sharedContext.drawImage(img, 0, 0);

  //好友排行
  let nameText = "好友排行榜";
  sharedContext.fillStyle = '#000000';
  sharedContext.font = "15px Arial";
  let lastX = centenrX - sharedContext.measureText(nameText).width /2;
  let lastY = centenrY - 50;
  sharedContext.fillText(nameText, lastX, lastY);
}

/** 发送分数*/
function sendScore(scoreNum) {

  wx.setUserCloudStorage({
    KVDataList: [{ key: "rankScore", value: scoreNum }],

    success: function (res) {
      console.log("发送成功");
    },
    fail: function (res) {
      console.log("发送失败");
    },
    complete: function (res) {
      //console.log("发送完成");
    }
  })
}

/**获取好友排行榜 */
function getFriendRank(){
  wx.getFriendCloudStorage({
    keyList: ["rankScore"],
    success: function (res) {
      console.log("获取好友排行成功");
      dataList = res.data;
      console.log("好友排行数量=" + dataList.length)
      drawRankList(dataList)
    },
    fail: function (res) {
      console.log("获取好友排行失败");
    },
    complete: function (res) {
      // console.log("获取好友排行完成");
    }
  })
}
/**绘制排行榜数据 */
function drawRankList(data) {
  data.forEach((item, index) => {
    var userData = item;
    console.log("index="+index +",名称=" + userData.nickname)
    console.log("url=" + userData.avatarUrl)
    let scoreDataList = userData.KVDataList;
    console.log("score=" + scoreDataList[0].value);

    drawUserInof(index,item);
  })
}
/**绘制用户信息 */
function drawUserInof(index,userData){
  drawRenderIcon(0, userData.avatarUrl);
  drawRenderIcon(1, userData.avatarUrl);
  drawRenderIcon(2, userData.avatarUrl);

  drawRenderNickName(0, userData.nickname);
  drawRenderNickName(1, userData.nickname);
  drawRenderNickName(2, userData.nickname);

  drawRenderScore(0, userData.KVDataList[0].value);
  drawRenderScore(1, userData.KVDataList[0].value);
  drawRenderScore(2, userData.KVDataList[0].value);
  
}

/**绘制渲染器头像*/
function drawRenderIcon(index, url) {

  let headImg = wx.createImage();
  var urlIndex = url.lastIndexOf("/");
  var sizeSrc = url.substring(0, urlIndex+1) + ICON_SIZE;
  console.log("sizeSrc =" + sizeSrc);
  headImg.src = sizeSrc;
  
  headImg.onerror = function () { console.log("头像加载失败:" + url) };
  let tempX = centenrX - 100;
  let tempY = centenrY + (index * ICON_GAP);
  headImg.onload = function () {
    sharedContext.drawImage(headImg, tempX, tempY);
  }
}

/**绘制渲染器昵称*/
function drawRenderNickName(index, nickName) {

  sharedContext.fillStyle = '#000000';
  sharedContext.font = "16px Arial";
  let tempX = centenrX - 20;
  let tempY = centenrY + (index * ICON_GAP) +20;

  if (nickName.length > 7) {//目前名字最多显示7个

    sharedContext.fillText(nickName.slice(0, 7) + "...", tempX, tempY);
  }
  else {

    sharedContext.fillText(nickName, tempX, tempY);
  }
}
/**绘制渲染器分数*/
function drawRenderScore(index, scoreNum) {

  sharedContext.fillStyle = '#000000';
  sharedContext.font = "16px Arial";
  let tempX = centenrX + 80;
  let tempY = centenrY + (index * ICON_GAP) + 20;

  sharedContext.fillText(scoreNum, tempX, tempY);
  
}




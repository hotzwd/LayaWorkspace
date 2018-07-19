require("./weapp-adapter.js");
require('./libs/laya.core.js');
require('./libs/laya.wxmini.js');
require('./libs/laya.webgl.js');
require('./libs/laya.ani.js');
require('./libs/laya.ui.js');
require("./RankItem.js");

var sharedCanvas;
var sharedContext;//共享离屏上下文

// let tempX, tempY, lastX, lastY;//临时记录位置
var currentLoadHeadCnt = 0;//当前加载完成头像个数
var dataList;//托管数据列表
var infoList = [];//好友信息列表
var rankType;//排行类型

var img; //背景
var centenrX = 0;//中心点X坐标
var centenrY = 0;//中心点X坐标

var rankPageIndex = 0;//排行榜页数

var STAST_HEIGHT = 10;//起始高度
var RANK_WIDTH = 0.1;//好友排行x值所在比例
var HEAD_ICON_WIDTH = 0.25;//头像框x值所在比例
var NICK_NAME_WIDTH = 0.42;//昵称x值所在比例
var COUNT_WIDTH = 0.85;//特戒数量x值所在比例
var SPACE_HEIGHT = 30;//间隔高度
var ICON_SIZE = 30;//头像大小 0、46、64、96、132
var ICON_GAP = ICON_SIZE +15; //头像间距
var RANKITEMNUM = 3;//每页排行榜显示数量

var FRIEND = 1;//好友排行
var GROUP = 2;//群组排行
var SCORE = 3;//发送分数
var RANK = 4;//全部排行榜


//初始化微信小游戏
Laya.MiniAdpter.init(true, true);

//laya初始化
Laya.init(720, 1280);

//FPS
// Laya.Stat.show(0,0);
//设置适配模式 宽度不变，高度根据屏幕比缩放
Laya.stage.scaleMode = "fixedauto";
//场景布局类型 自动竖屏
Laya.stage.screenMode = "vertical";
//设置水平居中对齐
Laya.stage.alignH = "center";
//垂直居中对齐
Laya.stage.alignV = "middle";

Laya.stage.bgColor = "#191514";//设置画布的背景颜色。


wx.onMessage(function(data){

  console.log("收到主域消息:" + data);

  sharedCanvas = wx.getSharedCanvas();
  sharedContext = sharedCanvas.getContext('2d');
  centenrX = sharedCanvas.width / 2;
  centenrY = sharedCanvas.height / 2 + 30;

  sharedContext.clearRect(0, 0, sharedCanvas.width, sharedCanvas.height)
  // sharedContext.fillStyle = '#ffffff'
  sharedContext.fillStyle = 'red'
  // sharedContext.fillRect(0, 0, 500, 500)
  
  if (data.msgType == FRIEND) {//好友排行
    console.log("好友排行")
    getRankPage(data.page);
    // getFriendRank();
  }
  else if (data.msgType == GROUP) {//群组排行

  }
  else if (data.msgType == SCORE) {//发送分数
    sendScore(data.score + "");
  }
  else if (data.msgType == RANK) {//全部排行榜
    showRank();
  }

  console.log("执行onMessage结束:");
})

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

function showRank() {
    wx.getFriendCloudStorage({
      keyList: ['rankScore'],
      fail:function(res){console.log(res)},
        success: function (res) {
            console.log("getFriendCloudStorage");

            // Utils.GameLogObject(res.data[0].KVDataList);
            //有效数据--res.data里返回当前同玩好友KVDataList 没有当前key 则为长度为0
            var dataArr = Utils.getValidData(res.data);
            dataArr = Utils.scoreOrder(dataArr);

            //testData(10, dataArr);


            var list = new Laya.List();
            list.itemRender = RankItem;
            list.vScrollBarSkin = "";  // 滚动条
            list.repeatX = 1;//设置 list 的水平方向单元格数量。
            list.repeatY = 5;//设置 list 的垂直方向单元格数量。
            list.array = dataArr;

            list.centerX = 0;
            list.centerY = 0;
            list.size(577, 636);
            list.renderHandler = new Laya.Handler(this, updateItem);
            Laya.stage.addChild(list);
        }
    });
}
function updateItem(cell, index) {
    cell.init(cell, index);
}

/**获取好友排行榜页面 */
function getRankPage(page){
  if(page == 0){
    rankPageIndex = 0;
    getFriendRank();
  }else if(page == 1){
    console.log("下一页")
    if((rankPageIndex + 1) * RANKITEMNUM < dataList.length){
      rankPageIndex++
    }
    getPageDataList();
  }else if(page == -1){
    console.log("上一页")
    if(rankPageIndex == 0){
      rankPageIndex = 0
    }else{
      rankPageIndex--;
    }
    getPageDataList();
  }
  
}
/**获取好友排行榜 */
function getFriendRank(){
  wx.getFriendCloudStorage({
    keyList: ["rankScore"],
    success: function (res) {
      console.log("获取好友排行成功");
      dataList = res.data;
      console.log("好友排行数量=" + dataList.length)
      // let tempData1 = dataList[0];
      // dataList.push(tempData1)
      // let tempData2 = dataList[0];
      // dataList.push(tempData2)
      // let tempData3 = dataList[0];
      // dataList.push(tempData3)
      // let tempData4 = dataList[0];
      // dataList.push(tempData4)
      
      
      dataList.sort(compareScore)
      getPageDataList();
      // drawRankList(dataList)
    },
    fail: function (res) {
      console.log("获取好友排行失败");
    },
    complete: function (res) {
      // console.log("获取好友排行完成");
    }
  })
}
/**排行榜排序 */
function compareScore(a,b){
  var tempA = a.KVDataList[0].value;
  var tempB = b.KVDataList[0].value;
  // console.log("------------排行对比--tempA="+tempA+",tempB="+tempB);
  return tempB - tempA;
}

/**获取当前页面数据 */
function getPageDataList(){
  var starIndex = rankPageIndex * RANKITEMNUM;
  var endIndex = starIndex + RANKITEMNUM;
  if (dataList.length < endIndex){
    endIndex = dataList.length;
  }
  infoList = [];
  for (var i = starIndex; i < endIndex; i++){
    console.log("----showindex="+i);
    infoList.push(dataList[i]);
  }
  drawRankList(infoList)

}
/**绘制排行榜数据 */
function drawRankList(data) {
  data.forEach(function(item, index){
    var userData = item;
    console.log("index="+index +",名称=" + userData.nickname)
    console.log("url=" + userData.avatarUrl)
    var scoreDataList = userData.KVDataList;
    console.log("score=" + scoreDataList[0].value);

    drawUserInof(index,item);
  })
}
/**绘制用户信息 */
function drawUserInof(index,userData){
  drawRenderIcon(index, userData.avatarUrl);
  drawRenderNickName(index, userData.nickname);
  drawRenderScore(index, userData.KVDataList[0].value);

  // drawRenderNickName(0, userData.nickname);
  // drawRenderNickName(1, userData.nickname);
  // drawRenderNickName(2, userData.nickname);

  // drawRenderScore(0, userData.KVDataList[0].value);
  // drawRenderScore(1, userData.KVDataList[0].value);
  // drawRenderScore(2, userData.KVDataList[0].value);
  
}

/**绘制渲染器头像*/
function drawRenderIcon(index, url) {

  var headImg = wx.createImage();
  // var urlIndex = url.lastIndexOf("/");
  // var sizeSrc = url.substring(0, urlIndex+1) + ICON_SIZE;
  // console.log("sizeSrc =" + sizeSrc);
  // headImg.src = sizeSrc;
  headImg.src = url;
  
  headImg.onerror = function () { console.log("头像加载失败:" + url) };
  var tempX = centenrX - 70;
  var tempY = centenrY + (index * ICON_GAP);
  headImg.onload = function () {
    sharedContext.drawImage(headImg, tempX, tempY,ICON_SIZE,ICON_SIZE);
  }

  if(rankPageIndex == 0){
    var numImg = wx.createImage();
    numImg.src = "game/img_di"+(index + 1)+".png";
    var tempImgX = tempX - 37;
    var tempIMgY = tempY;
    numImg.onload = function () {
      sharedContext.drawImage(numImg, tempImgX, tempIMgY, 31, 34.5);
    }

  }else{
    //名次
    sharedContext.fillStyle = '#000000';
    sharedContext.font = "16px Arial";

    var tempNumX = tempX - 25;
    var tempNumY = tempY + 20;
    var idNum = (rankPageIndex * RANKITEMNUM + index + 1) +"";
    sharedContext.fillText(idNum, tempNumX, tempNumY);
  }


}

/**绘制渲染器昵称*/
function drawRenderNickName(index, nickName) {

  sharedContext.fillStyle = '#000000';
  sharedContext.font = "12px Arial";
  var tempX = centenrX - 30;
  var tempY = centenrY + (index * ICON_GAP) +20;
  
  if (nickName.length > 5) {//目前名字最多显示7个

    sharedContext.fillText(nickName.slice(0, 5) + "...", tempX, tempY);
  }
  else {

    sharedContext.fillText(nickName, tempX, tempY);
  }
}
/**绘制渲染器分数*/
function drawRenderScore(index, scoreNum) {

  sharedContext.fillStyle = '#000000';
  sharedContext.font = "14px Arial";
  
  var tempX = centenrX + 50;
  var tempY = centenrY + (index * ICON_GAP) + 20;

  sharedContext.fillText(scoreNum, tempX, tempY);
  
}




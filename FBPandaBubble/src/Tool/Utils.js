/**
 * 从地址中获取数据
 */
function GetQueryString(name){
  var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"),
      r = window.location.search.substr(1).match(reg);
  if(r!=null)return  unescape(r[2]); return '';
}

/**
 * 返回倒计时
 * _countDownNum  倒计时总时间 毫秒
 */
function GetCountDownText(countDownNum){
    var secondNum = countDownNum / 1000;
    var minuteNum = secondNum / 60;
    var hourNum = minuteNum / 60;
    var dayNum = hourNum / 24;

    var timeText = "";
    if(dayNum > 1){
        timeText = parseInt(dayNum) +"天";
    }else if(hourNum > 1){
        timeText = parseInt(hourNum) +"小时";
    }else if(minuteNum > 1){
        timeText = parseInt(minuteNum) + "分钟";
    }else{
        timeText = parseInt(secondNum)+"秒";
    }
    return timeText;
}
/**
 * 格式化名字长度
 */
function GetFormtName(name){
    var newName = name;
    var nameNum = 0;
    for(var i=0; i<name.length; i++){
        var reg = /^[0-9a-zA-Z]*$/g;
        if (reg.test(name[i])){
            // Gamelog("----是字母数字");
            nameNum += 1;
        }else{
            nameNum += 2;
        }
        if(nameNum > 8){
            newName = name.substring(0,i+1) + "...";
            break;
        }
    }
    return newName;
}

/** 分数文字*/
function BubbleScoreAnim(_point,_score,_fontName){
    var scoreLabel = new Laya.Label(_score);
    // scoreLabel.font = _fontName !=  null ? _fontName :"shuzi5Font";
    scoreLabel.font = "SimHei";
    scoreLabel.fontSize = 40;
    scoreLabel.bold = true;
    scoreLabel.color = "#ffffff";
    scoreLabel.stroke = 5;
    scoreLabel.strokeColor = "#7d10f4";
    scoreLabel.align = "center";
    scoreLabel.anchorX = 0.5;
    scoreLabel.anchorY = 0.5;
    scoreLabel.pos(_point.x,_point.y);
    Laya.stage.addChild(scoreLabel);
    // UIManager.getInstance().getUI("GameUI").addChild(scoreLabel);
    scoreLabel.alpha = 0;
    scoreLabel.scaleX = 0;
    scoreLabel.scaleY = 0;
    scoreLabel.zOrder = 5;

    var timeLine = new Laya.TimeLine();
    timeLine.addLabel("show",0).to(scoreLabel,
    {
        alpha:1,
        scaleX:1,
        scaleY:1,
    },200).addLabel("go",0).to(scoreLabel,
    {
        y:_point.y - 40,
        alpha:0,
    },400);
    this.moveOtherBubbleFinish = false;
    timeLine.play(0,false);
    timeLine.on(Laya.Event.COMPLETE,this,function(arg){
        arg.destroy();
    },[scoreLabel]);
}

//检测是否为中文，true表示是中文，false表示非中文
function isChinese(str) {
    if (/^[\u3220-\uFA29]+$/.test(str)) {
        return true;
    } else {
        return false;
    }
}
//名字太长转换...
function labelTransform(strOld, fontSize, width) {
    var strLen = 0;
    var strNew = "";
    for (var i = 0; i < strOld.length; i++) {
        var char = strOld.charAt(i);
        var isChin = isChinese(char);
        // Gamelog(char + ":" + isChin);
        if (isChin) {
            strLen = strLen + fontSize;
        }
        else {
            strLen = strLen + fontSize / 2;
        }

        if (strLen > width - fontSize) {
            strNew = strNew + "..";
            break;
        }
        else {
            strNew = strNew + char;
        }
    }

    return strNew;
}


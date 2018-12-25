/**
 * 从地址中获取数据
 */
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"),
        r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return '';
}

/**
 * 返回倒计时
 * _countDownNum  倒计时总时间 毫秒
 */
function GetCountDownText(countDownNum) {
    var secondNum = countDownNum / 1000;
    var minuteNum = secondNum / 60;
    var hourNum = minuteNum / 60;
    var dayNum = hourNum / 24;

    var timeText = "";
    if (dayNum > 1) {
        timeText = parseInt(dayNum) + "天";
    } else if (hourNum > 1) {
        timeText = parseInt(hourNum) + "小时";
    } else if (minuteNum > 1) {
        timeText = parseInt(minuteNum) + "分钟";
    } else {
        timeText = parseInt(secondNum) + "秒";
    }
    return timeText;
}
/**
 * 格式化名字长度
 */
function GetFormtName(name) {
    var newName = name;
    var nameNum = 0;
    for (var i = 0; i < name.length; i++) {
        var reg = /^[0-9a-zA-Z]*$/g;
        if (reg.test(name[i])) {
            // Gamelog("----是字母数字");
            nameNum += 1;
        } else {
            nameNum += 2;
        }
        if (nameNum > 8) {
            newName = name.substring(0, i + 1) + "...";
            break;
        }
    }
    return newName;
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

//获取第几周
function GetWeekNum() {
    var myDate = new Date();
    // myDate.setFullYear(2018, 5, 4);
    var curDay = myDate.toLocaleDateString();
    console.log("curDay:" + curDay);

    var dateBase = new Date();
    dateBase.setFullYear(2018, 4, 20);
    dateBase.setHours(0, 0, 0);
    // console.log("dateBase:" + dateBase.toLocaleDateString());
    var dayDiff = DateDiff("d", dateBase, myDate);
    var weekNum = Math.ceil(dayDiff / 7);
    // console.log("dayDiff = " + dayDiff);
    console.log("weekNum = " + weekNum);

    return weekNum;
}
//获取第几月
function GetMonthNum(){
    var myDate = new Date();

    var dateBase = new Date();
    dateBase.setFullYear(2018, 4, 20);
    dateBase.setHours(0, 0, 0);
    // console.log("dateBase:" + dateBase.toLocaleDateString());
    var monthDiff = DateDiff("m", dateBase, myDate);
    // var weekNum = Math.ceil(dayDiff / 7);
    // console.log("dayDiff = " + dayDiff);
    console.log("----monthDiff = " + monthDiff);

    return monthDiff;
}

function DateDiff(interval, date1, date2) {
    var long = date2.getTime() - date1.getTime(); //相差毫秒
    switch (interval.toLowerCase()) {
        case "y": return parseInt(date2.getFullYear() - date1.getFullYear());
        case "m": return parseInt((date2.getFullYear() - date1.getFullYear()) * 12 + (date2.getMonth() - date1.getMonth()));
        case "d": return parseInt(long / 1000 / 60 / 60 / 24);
        case "w": return parseInt(long / 1000 / 60 / 60 / 24 / 7);
        case "h": return parseInt(long / 1000 / 60 / 60);
        case "n": return parseInt(long / 1000 / 60);
        case "s": return parseInt(long / 1000);
        case "l": return parseInt(long);
    }
}

//设置本地最高分
function SetLocalMaxScore(newScore) {

    var maxScore = newScore;
    var key = "LocalHighScore_" + GetWeekNum();
    var score = LocalStorage.getItem(key);
    if (score == null || score == "" || score == "undefined") {
        var lastKey = "LocalHighScore_" + (GetWeekNum() - 1);
        var lastScore = LocalStorage.getItem(lastKey);
        if(lastScore != "" && lastScore != null){
            LocalStorage.removeItem(lastKey);
        }

        LocalStorage.setItem(key, newScore);
    }
    else {
        score = parseInt(score, 10);
        if (newScore > score) {
            LocalStorage.setItem(key, newScore);
        }
        else {
            maxScore = score;
        }
    }

    // console.log("maxScore = " + maxScore);
    return maxScore;
}


//设置世界排行本地最高分
function SetLocalWorldMaxScore(newScore) {
    var maxScore = newScore;
    var key = "LocalWorldHighScore_" + GetMonthNum();
    var score = LocalStorage.getItem(key);
    if (score == null || score == "" || score == "undefined") {
        var lastKey = "LocalWorldHighScore_" + (GetMonthNum() - 1);
        var lastScore = LocalStorage.getItem(lastKey);
        if(lastScore != "" && lastScore != null){
            LocalStorage.removeItem(lastKey);
        }
        LocalStorage.setItem(key, newScore);
    }
    else {

        score = parseInt(score, 10);
        if (newScore > score) {
            LocalStorage.setItem(key, newScore);
        }
        else {
            maxScore = score;
        }
    }
    return maxScore;
}

//设置本地金币数量
function SetLocalGoldNum(newScore) {

    var key = "LocalGoldNum";
    LocalStorage.setItem(key, newScore);
}
//获取本地金币数量
function GetLocalGoldNum() {

    var key = "LocalGoldNum";
    var score = LocalStorage.getItem(key);
    if (score == null || score == "" || score == "undefined") {
        SetLocalGoldNum(10);
        score = 10;
    }
    else {
        score = parseInt(score, 10);
    }

    return score;
}
//设置本地生命数量
function SetLocalLifeNum(newScore) {

    var key = "LocalLifeNum";
    LocalStorage.setItem(key, newScore);
}
//获取本地生命数量
function GetLocalLifeNum() {

    var key = "LocalLifeNum";
    var score = LocalStorage.getItem(key);
    if (score == null || score == "" || score == "undefined") {
        SetLocalLifeNum(0);
        score = 0;
    }
    else {
        score = parseInt(score, 10);
    }

    return score;
}
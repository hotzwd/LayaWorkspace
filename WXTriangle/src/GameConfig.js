var SoundManager = laya.media.SoundManager;
var LocalStorage = laya.net.LocalStorage;
var Point = laya.maths.Point;
var Sprite = laya.display.Sprite;
var Browser = Laya.Browser;

var GameConfig = {
    
    //游戏宽 高
    GameWidth : 720,
    GameHeight : 1280,

    //游戏速度
    speed : 8
    
};

/**是否显示Log */
var GameLogVisible = true;
/**是否运行在QQ */
// var GameInQQ = true;
// var GameInQQ = false;

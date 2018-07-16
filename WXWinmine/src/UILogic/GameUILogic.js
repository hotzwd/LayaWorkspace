/**
 * 游戏界面逻辑 by lzq
 */
var GameUILogic = (function(_super){
    function GameUILogic(){
        GameUILogic.super(this);

    }
    Laya.class(GameUILogic,"UILogic.GameUILogic",_super);
    var _proto = GameUILogic.prototype;
    
    var GAME_TIME = 10;                                        //一局游戏的时间

    _proto.dataArr = [];                                      //list数据
    this.msgTotalHeight = 0;                                  //当前聊天记录位置
    this.eShopBotBoxPosY = 0;                                 //底部电商坐标

    _proto.onInit = function(){
        this.width = Laya.stage.width;
        this.height = Laya.stage.height;
        //存放UI效果
        this.blockBox.width = Laya.stage.width;
        this.blockBox.height = Laya.stage.height;
        this.bottomPosY = 0;

        MusicManager.getInstance().playMusic("res/music/bg.mp3");
        MusicManager.getInstance().playSound("res/music/15.wav");
        _proto.dataArr = [];


        //等界面适配完成后调用
        Laya.timer.frameOnce(5, this, function () {

        });
    }

    _proto.onDestroy = function(){

    }
    //初始化界面
    _proto.onEnterGameInit = function(){

    }
    
     /**更新设置界面 */
     _proto.initSetBox = function(){
         this.setBox.visible = true;
         MusicManager.getInstance().playSound("res/music/1.wav");
     }
     /**点击音效 */
     _proto.setSoundClick = function(){
        Gamelog("------点击音效");
        MusicManager.getInstance().playSound("res/music/1.wav");
        var soundSwitch = MusicManager.getInstance().managerSwitch;
        if(soundSwitch == 1){
            this.btn_setSound.skin = "GameUI/btn_guan.png";
            MusicManager.getInstance().managerSwitch = 0;
            // LocalStorage.setItem("soundSwitch",0);
            SoundManager.stopAll();
        }else{
            MusicManager.getInstance().managerSwitch = 1;
            // LocalStorage.setItem("soundSwitch",1);
            this.btn_setSound.skin = "GameUI/btn_kai.png";
            MusicManager.getInstance().playMusic("res/music/bg.mp3");
        }
     }
    
   
    return GameUILogic;
})(GameUI);
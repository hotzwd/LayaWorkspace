/**
 * 结算界面逻辑 by lzq
 */
var GameoverUILogic = (function(_super){
    function GameoverUILogic(){
        GameoverUILogic.super(this);

    }
    Laya.class(GameoverUILogic,"UILogic.GameoverUILogic",_super);
    var _proto = GameoverUILogic.prototype;
    
    _proto.onInit = function(){
        this.width = Laya.stage.width;
        this.height = Laya.stage.height;
        //设置层级 相对于stage
        this.zOrder = 50;

        this.img_light.rotation = 0;
        var timeLine = new Laya.TimeLine();
        timeLine.addLabel("show",0).to(this.img_light,
        {
            rotation:360
        },4000);
        timeLine.play(0,true);


        var scoreNum = SceneManager.getInstance().currentScene.scoreNum;
        this.label_overScore.text = scoreNum;

        this.img_light.visible = false;
        var highScore = LocalStorage.getItem("HighScore");
        if(highScore){
            if(scoreNum > parseInt(highScore)){
                highScore = scoreNum;
                this.img_light.visible = true;
                this.sendScore(highScore);
            }
        }else{
            highScore = scoreNum;
            this.img_light.visible = true;
            this.sendScore(highScore);
        }
        LocalStorage.setItem("HighScore",highScore);
        this.label_heightScore.text = highScore;

        this.onGetRankList();

        this.btn_again.on(Laya.Event.CLICK,this,this.onGameAgain);
       // this.btn_closeOver.on(Laya.Event.CLICK,this,this.onCloseGame);

        //this.updateListData();

        //MessageController.getInstance().AddNotification(MessageEventName.RankListEvent,this,this.RankListReceiver);
    }
    _proto.onDestroy = function(){
        //MessageController.getInstance().RemoveNotification(MessageEventName.RankListEvent,this,this.RankListReceiver);
    }

     
     /**重新开始 */
    _proto.onGameAgain = function(){
        UIManager.getInstance().closeUI("GameoverUI");
        MusicManager.getInstance().playSound("res/music/1.wav");
        SceneManager.getInstance().currentScene.restartGame();
        // UIManager.getInstance().showUI('RoomUI');
        // UIManager.getInstance().closeUI("GameUI",true);
        
    }
    /**关闭游戏 */
    _proto.onCloseGame = function(){
        //跳转到玩吧
        // window.location.href=UserModule.getInstance().redirect;
    }
    /**发送数据 */
    _proto.sendScore = function(highScore){
        if(onWeiXin){
            let openDataContext = wx.getOpenDataContext()
            openDataContext.postMessage({
                msgType:3,
                score:highScore,
            })
        }
    }
    /**获取排行榜 */
    _proto.onGetRankList = function(){
        if(onWeiXin){

            let openDataContext = wx.getOpenDataContext()

            openDataContext.postMessage({
                msgType:1,
            })
            
            let sharedCanvas = openDataContext.canvas;

            var rankSprite2 = new Laya.Sprite();
            this.addChild(rankSprite2);
            Laya.timer.once(1000, this, function () {
                var rankTexture = new Laya.Texture(sharedCanvas);
                //rankTexture.bitmap.alwaysChange = true;//小游戏使用，非常费，每帧刷新  
                rankSprite2.graphics.drawTexture(rankTexture, 0, 0,Laya.stage.width,Laya.stage.height);
            });   
        }
    }
    return GameoverUILogic;
})(GameoverUI);
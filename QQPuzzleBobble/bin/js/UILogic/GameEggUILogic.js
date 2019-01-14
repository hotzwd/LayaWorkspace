/**
 * 获得金蛋界面逻辑 by lzq
 */
var GameEggUILogic = (function(_super){
    function GameEggUILogic(){
        GameEggUILogic.super(this);

    }
    Laya.class(GameEggUILogic,"UILogic.GameEggUILogic",_super);
    var _proto = GameEggUILogic.prototype;

    _proto.onInit = function(){
        this.width = Laya.stage.width;
        this.height = Laya.stage.height;
        //设置层级 相对于stage
        this.zOrder = 50;

        this.ani1.play(0, true);
        this.ani2.play(0, false);
        
        this.btn_go.on(Laya.Event.CLICK,this,this.onShowVidoAd);
        this.btn_pass.on(Laya.Event.CLICK,this,this.onCancelClick);

        SceneManager.getInstance().currentScene.pauseGame();
        SceneManager.getInstance().currentScene.m_propBubleList = [];

    }
    _proto.onDestroy = function(){
       
    }

     
     /**点击跳过 */
    _proto.onCancelClick = function(){
        UIManager.getInstance().closeUI("GameEggUI",true);
        SceneManager.getInstance().currentScene.resumeGame();
    }
 

    /**显示视频广告 */
    // _proto.onShowVidoAd = function () {
    //     if (!Browser.onMiniGame) {
    //         UIManager.getInstance().closeUI("GameEggUI",true);
    //         SceneManager.getInstance().currentScene.resumeGame();
    //         SceneManager.getInstance().currentScene.createPropBubble();
    //         return;
    //     }

    //     var t_videoAd = wxGame.getInstance().eggVideoAd;
    //     t_videoAd.show();
    //     t_videoAd.onClose( function(res){
    //         // 用户点击了【关闭广告】按钮
    //         // 小于 2.1.0 的基础库版本，res 是一个 undefined
    //         if (res && res.isEnded || res === undefined) {
    //             // 正常播放结束，可以下发游戏奖励
    //             UIManager.getInstance().closeUI("GameEggUI",true);
    //             SceneManager.getInstance().currentScene.createPropBubble();
    //             SceneManager.getInstance().currentScene.resumeGame();
    //         }
    //         else {
    //             // 播放中途退出，不下发游戏奖励
    //             UIManager.getInstance().closeUI("GameEggUI",true);
    //             SceneManager.getInstance().currentScene.resumeGame();
    //         }
    //     })

    // }

    /**显示视频广告 */
    _proto.onShowVidoAd = function () {
       qqGame.getInstance().showVideoAD(this,this.reviveGame);

    }
    //复活
    _proto.reviveGame = function(_success){
        // MusicManager.getInstance().playSound("res/music/click.wav");
        UIManager.getInstance().closeUI("GameEggUI");
        if(_success){
            SceneManager.getInstance().currentScene.createPropBubble();
            SceneManager.getInstance().currentScene.resumeGame();
        }else{
             SceneManager.getInstance().currentScene.resumeGame();
        }
    }

    return GameEggUILogic;
})(GameEggUI);
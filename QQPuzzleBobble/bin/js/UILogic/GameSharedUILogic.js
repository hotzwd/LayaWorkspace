/**
 * 分享界面逻辑 by lzq
 */
var GameSharedUILogic = (function(_super){
    function GameSharedUILogic(){
        GameSharedUILogic.super(this);

    }
    Laya.class(GameSharedUILogic,"UILogic.GameSharedUILogic",_super);
    var _proto = GameSharedUILogic.prototype;

    _proto.onInit = function(){
        this.width = Laya.stage.width;
        this.height = Laya.stage.height;
        //设置层级 相对于stage
        this.zOrder = 50;

        this.aniShare.play(0, true);
        
        this.btn_shard.on(Laya.Event.CLICK,this,this.onShowVidoAd);
        this.btn_cancel.on(Laya.Event.CLICK,this,this.onCancelClick);


    }
    _proto.onDestroy = function(){
       
    }

     
     /**点击跳过 */
    _proto.onCancelClick = function(){
        UIManager.getInstance().closeUI("GameSharedUI");
        SceneManager.getInstance().currentScene.gameUI.gameoverByTime();
    }
    /**分享游戏 */
    _proto.onShardClick = function(){
        
    }
    /**发送数据 */
    _proto.sendScore = function(highScore){
        // if(Browser.onMiniGame){
        //     var openDataContext = wx.getOpenDataContext()
        //     openDataContext.postMessage({
        //         msgType:3,
        //         score:highScore,
        //     })
        // }
    }

    /**显示视频广告 */
    // _proto.onShowVidoAd = function () {
    //     if (!Browser.onMiniGame) {
    //         UIManager.getInstance().closeUI("GameSharedUI",true);
    //         var scoreNum = SceneManager.getInstance().currentScene.scoreNum;
    //         SceneManager.getInstance().currentScene.restartGame(false,scoreNum);
    //         return;
    //     }

    //     var t_videoAd = qqGame.getInstance().videoAd;
    //     t_videoAd.show();
    //     t_videoAd.onClose( function(res){
    //         // 用户点击了【关闭广告】按钮
    //         // 小于 2.1.0 的基础库版本，res 是一个 undefined
    //         if (res && res.isEnded || res === undefined) {
    //             // 正常播放结束，可以下发游戏奖励
    //             UIManager.getInstance().closeUI("GameSharedUI",true);
    //             var scoreNum = SceneManager.getInstance().currentScene.scoreNum;
    //             SceneManager.getInstance().currentScene.restartGame(false,scoreNum);
    //         }
    //         else {
    //             // 播放中途退出，不下发游戏奖励
    //             UIManager.getInstance().closeUI("GameSharedUI",true);
    //             UIManager.getInstance().showUI("GameoverUI");
    //             // SceneManager.getInstance().currentScene.gameUI.gameoverByTime();
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
        UIManager.getInstance().closeUI("GameSharedUI");
        if(_success){
            var scoreNum = SceneManager.getInstance().currentScene.scoreNum;
            SceneManager.getInstance().currentScene.restartGame(false,scoreNum);
        }else{
             UIManager.getInstance().showUI("GameOverUI");
        }
    }

    return GameSharedUILogic;
})(GameSharedUI);
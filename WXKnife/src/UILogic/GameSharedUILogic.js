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
        UIManager.getInstance().showUI("GameOverUI");
    }

    /**显示视频广告 */
    _proto.onShowVidoAd = function () {
       wxGame.getInstance().showVideoAD(this,this.reviveGame);

    }
    //复活
    _proto.reviveGame = function(_success){
        UIManager.getInstance().closeUI("GameSharedUI");
        if(_success){
            var scoreNum = SceneManager.getInstance().currentScene.gameLevel;
            SceneManager.getInstance().currentScene.restartGame(false,scoreNum);
            SceneManager.getInstance().currentScene.resumeGame();
            wxGame.getInstance().createVideoAD();
        }
    }

    return GameSharedUILogic;
})(GameSharedUI);
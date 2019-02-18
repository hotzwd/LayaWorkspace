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
        
        this.btn_shard.on(Laya.Event.CLICK,this,this.fangkuai_onShowVidoAd);
        this.btn_cancel.on(Laya.Event.CLICK,this,this.fangkuai_onCancelClick);


    }
    _proto.onDestroy = function(){
       
    }

     
     /**点击跳过 */
    _proto.fangkuai_onCancelClick = function(){
        // MusicManager.getInstance().playSound("res/music/btnclick.wav");
        UIManager.getInstance().closeUI("GameSharedUI");
        UIManager.getInstance().showUI("GameOverUI");
    }

    /**显示视频广告 */
    _proto.fangkuai_onShowVidoAd = function () {
       wxGame.getInstance().showVideoAD(this,this.fangkuai_reviveGame);

    }
    //复活
    _proto.fangkuai_reviveGame = function(_success){
        // MusicManager.getInstance().playSound("res/music/btnclick.wav");
        UIManager.getInstance().closeUI("GameSharedUI");
        if(_success){
            var scoreNum = SceneManager.getInstance().currentScene.gameScore;
            SceneManager.getInstance().currentScene.fangkuai_restartGame(false,scoreNum);
            SceneManager.getInstance().currentScene.fangkuai_resumeGame();
            wxGame.getInstance().createVideoAD();
        }
    }

    return GameSharedUILogic;
})(GameSharedUI);
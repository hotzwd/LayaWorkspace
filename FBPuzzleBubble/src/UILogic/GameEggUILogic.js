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
    _proto.onShowVidoAd = function () {
        if (!GameInFackBook) {
            UIManager.getInstance().closeUI("GameEggUI",true);
            SceneManager.getInstance().currentScene.resumeGame();
            SceneManager.getInstance().currentScene.createPropBubble();
            return;
        }

        window.FBRewardAd.showAsync().then(
            function() {
                // Ad watched
                // 正常播放结束，可以下发游戏奖励
                UIManager.getInstance().closeUI("GameEggUI",true);
                // var scoreNum = SceneManager.getInstance().currentScene.scoreNum;
                // SceneManager.getInstance().currentScene.restartGame(false,scoreNum);
                SceneManager.getInstance().currentScene.resumeGame();
                SceneManager.getInstance().currentScene.createPropBubble();

                FBGame.getInstance().loadRewardAd();
            }
        );

    }

    return GameEggUILogic;
})(GameEggUI);
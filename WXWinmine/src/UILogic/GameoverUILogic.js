/**
 * 游戏结束逻辑 by lzq
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

        this.zOrder = 10;

        this.btn_shared.on(Laya.Event.CLICK,this,this._sharedClickEvent);
        this.btn_playAgain.on(Laya.Event.CLICK,this,this._playAgainClickEvent);
    }

    _proto.onDestroy = function(){

    }

    /**根据结果显示 */
    _proto.initGameover = function(_isWin){
        if(_isWin){
            this.img_result.skin = "GameUI/jiesuan_biaoti_shengli.png";
        }else{
            this.img_result.skin = "GameUI/jiesuan_biaoti_shibai.png";
        }

        this.label_time.text = GetTimeFormat(SceneManager.getInstance().currentScene.gameTime);

    }
     /**分享游戏 */
    _proto._sharedClickEvent = function () {
        if(!this.isSharing){
            this.isSharing = true;
            // wxGame.getInstance().shareGame();
            wxGame.getInstance().shareScore(SceneManager.getInstance().currentScene.gameScore,this._shareEnd)
        }
    }
    /**重新开始 */
    _proto._playAgainClickEvent = function () {
        SceneManager.getInstance().currentScene.resetGame();
        UIManager.getInstance().closeUI("GameoverUI");
        UIManager.getInstance().showUI("GameStartUI");
        // wxGame.getInstance().showOpenDataContext(false);
        // SceneManager.getInstance().currentScene.startGame();
        
    }

    return GameoverUILogic;
})(GameoverUI);
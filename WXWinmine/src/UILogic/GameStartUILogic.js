/**
 * 游戏开始逻辑 by lzq
 */
var GameStartUILogic = (function(_super){
    function GameStartUILogic(){
        GameStartUILogic.super(this);

    }
    Laya.class(GameStartUILogic,"UILogic.GameStartUILogic",_super);
    var _proto = GameStartUILogic.prototype;
    
    _proto.onInit = function(){
        this.width = Laya.stage.width;
        this.height = Laya.stage.height;

        this.zOrder = 10;

        this.guidBox.on(Laya.Event.CLICK,this,this._guidBoxClickEvent);
    }

    _proto.onDestroy = function(){

    }

    /**点击引导结束 */
    _proto._guidBoxClickEvent = function(){
        UIManager.getInstance().closeUI("GameStartUI");
        SceneManager.getInstance().currentScene.startGame();
    }

    return GameStartUILogic;
})(GameStartUI);
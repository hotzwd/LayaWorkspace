/**
 * 游戏结束界面
 */

var GameOverUILogic = (function (_super) {

    function GameOverUILogic() {
        GameOverUILogic.super(this);
    }
    Laya.class(GameOverUILogic, "GameOverUILogic", _super);
    _proto = GameOverUILogic.prototype;
     

    _proto.onInit = function () {
        this.width = Laya.stage.width;
        this.height = Laya.stage.height;
        

        this.btn_close.on(Laya.Event.CLICK,this,this._closeClickEvent);

    }
    
    _proto.onDestroy = function () {
        // MusicManager.getInstance().stopMusic();
    }

    _proto._closeClickEvent = function(){
        UIManager.getInstance().closeUI("GameOverUI");
        // UIManager.getInstance().showUI("GameUI");
    }
  


    return GameOverUILogic;
})(GameOverUI);
/**
 * 开始游戏界面
 */

var GameStartUiLogic = (function (_super) {

    function GameStartUiLogic() {
        GameStartUiLogic.super(this);
    }
    Laya.class(GameStartUiLogic, "GameStartUiLogic", _super);
    _proto = GameStartUiLogic.prototype;
     

    _proto.onInit = function () {
        this.width = Laya.stage.width;
        this.height = Laya.stage.height;
        

        this.btn_start.on(Laya.Event.CLICK,this,this._startClickEvent);
        wxGame.getInstance().showClubBtn(true);
    }
    
    _proto.onDestroy = function () {
        // MusicManager.getInstance().stopMusic();
    }

    _proto._startClickEvent = function(){
        wxGame.getInstance().showClubBtn(false);
        wxGame.getInstance().createVideoAD();

        UIManager.getInstance().closeUI("GameStartUI");
        UIManager.getInstance().showUI("GameUI");
    }
  


    return GameStartUiLogic;
})(GameStartUI);
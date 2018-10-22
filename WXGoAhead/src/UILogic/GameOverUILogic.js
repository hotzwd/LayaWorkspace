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
        this.zOrder = 100;

        this.btn_next.on(Laya.Event.CLICK,this,this._nextLevelEvent);

    }
    
    _proto.onDestroy = function () {
        // MusicManager.getInstance().stopMusic();
    }

    _proto._nextLevelEvent = function(){
        UIManager.getInstance().closeUI("GameOverUI");
        SceneManager.getInstance().currentScene.nextlevelGame();
    }
    

    return GameOverUILogic;
})(GameOverUI);
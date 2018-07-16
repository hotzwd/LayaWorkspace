/**
 * 主游戏界面
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

        // MusicManager.getInstance().playMusic("res/music/1.mp3");

        // this.moveBox.on(Laya.Event.MOUSE_DOWN,this,this._mouseDowm);
        this.btn_shared.on(Laya.Event.CLICK,this,this._sharedClickEvent);
        this.btn_playAgain.on(Laya.Event.CLICK,this,this._playAgainClickEvent);

    }
    

    _proto.onDestroy = function () {
        // MusicManager.getInstance().stopMusic();
    }


    /**分享游戏 */
    _proto._sharedClickEvent = function () {

    }
    /**重新开始 */
    _proto._playAgainClickEvent = function () {
        SceneManager.getInstance().currentScene.restartGame();
        UIManager.getInstance().closeUI("GameOverUI",true);
        UIManager.getInstance().showUI("GameStartUI");
        
    }

    return GameOverUILogic;
})(GameOverUI);
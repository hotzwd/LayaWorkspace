/**
 * 主游戏界面
 */

var GameUILogic = (function (_super) {

    function GameUILogic() {
        GameUILogic.super(this);
    }
    Laya.class(GameUILogic, "GameUILogic", _super);
    _proto = GameUILogic.prototype;

    _proto.onInit = function () {
        this.width = Laya.stage.width;
        this.height = Laya.stage.height;

        // MusicManager.getInstance().playMusic("res/music/1.mp3");

        // this.moveBox.on(Laya.Event.MOUSE_DOWN,this,this._mouseDowm);

    }


    _proto.onDestroy = function () {
        // MusicManager.getInstance().stopMusic();
    }


    /**关闭游戏 */
    _proto.onCloseGame = function () {

    }

    return GameUILogic;
})(GameUI);
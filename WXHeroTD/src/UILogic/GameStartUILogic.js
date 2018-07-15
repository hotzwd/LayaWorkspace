/**
 * 游戏结束界面
 */
var GameStartUILogic = (function (_super) {

    function GameStartUILogic() {
        GameStartUILogic.super(this);
    }
    Laya.class(GameStartUILogic, "GameStartUILogic", _super);
    _proto = GameStartUILogic.prototype;

    _proto.onInit = function () {
        this.width = Laya.stage.width;
        this.height = Laya.stage.height;

        // this.guildBox.addChild(this.curHero);
        // this.curHero.pos(this.curTower.x, this.curTower.y + 200);
        // this.curHero.stopAnim();
        var s_mask = this.guildBox.getChildByName("s_mask");
        var sp = new Laya.Sprite();
        sp.blendMode = "destination-out";
        sp.graphics.drawRect(0, 0, 200, 200, "#000000");
        s_mask.addChild(sp);


        this.guildBox.visible = false;
        this.startBox.visible = true;

        this.btn_start.on(Laya.Event.CLICK,this,this._startClickEvent);
        this.guildBox.on(Laya.Event.CLICK,this,this._guildClickEvent);
    }
    

    _proto.onDestroy = function () {
        // MusicManager.getInstance().stopMusic();
    }


    /**开始游戏 */
    _proto._startClickEvent = function () {
        this.guildBox.visible = true;
        this.startBox.visible = false;
    }
    /**点击引导 */
    _proto._guildClickEvent = function () {
        // this.zOrder = 25;
        this.guildBox.visible = false;
        UIManager.getInstance().closeUI("GameStartUI",true);
    }
    
    return GameStartUILogic;
})(GameStartUI);
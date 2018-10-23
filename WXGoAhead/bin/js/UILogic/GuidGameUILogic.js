/**
 * 引导游戏界面
 */

var GuidGameUILogic = (function (_super) {

    function GuidGameUILogic() {
        GuidGameUILogic.super(this);
    }
    Laya.class(GuidGameUILogic, "GuidGameUILogic", _super);
    _proto = GuidGameUILogic.prototype;

    _proto.onInit = function () {
        this.zOrder = 100;

        this.btn_closeGuid.on(Laya.Event.CLICK,this,this._closeGuidBoxEvent);

        this.ani1.play(0,true);
    }
    
    _proto.onDestroy = function () {
        // MusicManager.getInstance().stopMusic();
    }

    _proto._closeGuidBoxEvent = function(){
        UIManager.getInstance().closeUI("GuidGameUI");
    }
    

    return GuidGameUILogic;
})(GuidGameUI);
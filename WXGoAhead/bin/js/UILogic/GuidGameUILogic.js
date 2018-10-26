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
        this.img_getGold.on(Laya.Event.CLICK,this,this._getGoldClickEvent);

        this.ani1.play(0,true);
    }
    
    _proto.onDestroy = function () {
        // MusicManager.getInstance().stopMusic();
    }

    _proto._closeGuidBoxEvent = function(){
        UIManager.getInstance().closeUI("GuidGameUI");
    }

    //点击获取金币
    _proto._getGoldClickEvent = function(){
        var t_gameUI = SceneManager.getInstance().currentScene.gameUI;
        if(Browser.onMiniGame){
          if(wxGame.getInstance().videoAd == null || !window.wxLoadVideoAd)
                return;
            t_gameUI.showRewardAd();
        }else{
            t_gameUI.rewardEffect();
        }
    }
    

    return GuidGameUILogic;
})(GuidGameUI);
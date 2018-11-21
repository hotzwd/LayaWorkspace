/**
 * 结算界面逻辑 by lzq
 */
var GameEndShareUILogic = (function (_super) {
    function GameEndShareUILogic() {
        GameEndShareUILogic.super(this);

    }
    Laya.class(GameEndShareUILogic, "UILogic.GameEndShareUILogic", _super);
    var _proto = GameEndShareUILogic.prototype;

    this.timerNum = 10;

    _proto.onInit = function () {
        this.width = Laya.stage.width;
        this.height = Laya.stage.height;
        //设置层级 相对于stage
        this.zOrder = 50;
        this.timerNum = 10;

        var scoreNum = GetTimeFormat(SceneManager.getInstance().currentScene.gameTime);
        this.score.text = scoreNum;
        this.endTimer.text = this.timerNum + "s";


        // this.shareBtn.on(Laya.Event.CLICK, this, this.onShare);
        this.shareBtn.on(Laya.Event.CLICK, this, this.onShowVidoAd);
        this.cancleBtn.on(Laya.Event.CLICK, this, this.onCloseShare);

        Laya.timer.loop(1000, this, this.onEndTimer);
        this.aniShare.play(0, true);

        // wxGame.getInstance().hideAd();
    }
    _proto.onDestroy = function () {
        Laya.timer.clear(this, this.onEndTimer);
    }

    /**
     * 结束倒计时
     */
    _proto.onEndTimer = function () {
        this.timerNum -= 1;
        this.endTimer.text = this.timerNum + "s";

        if (this.timerNum <= 0) {
            this.onCloseShare();
            return;
        }
    }


    /**跳过 */
    _proto.onCloseShare = function () {
        // UIManager.getInstance().closeUI("GameEndShareUI",true);
        // SceneManager.getInstance().currentScene.gameOver();
        // UIManager.getInstance().showUI("GameoverUI").initGameover(false);

        this.showAdResult(false);
        
    }

    /**显示视频广告 */
    _proto.onShowVidoAd = function () {

        Laya.timer.clear(this, this.onEndTimer);
        //播放广告
        if (!Browser.onMiniGame) {
            // SceneManager.getInstance().currentScene.addLife(true);
            wxGame.getInstance().showVideoAD(this,this.showAdResult);
         }else{
             wxGame.getInstance().showVideoAD(this,this.showAdResult);
         }


    }

    //观看结果
    _proto.showAdResult = function(p_isWatch){
        if (p_isWatch) {
            Gamelog("看广告成功");

            UIManager.getInstance().closeUI("GameEndShareUI",true);
            SceneManager.getInstance().currentScene.resuemGame();

            wxGame.getInstance().createVideoAD();
        } else {
            Gamelog("看广告失败");
            SceneManager.getInstance().currentScene.gameOver();
            UIManager.getInstance().showUI("GameoverUI").initGameover(false);
            UIManager.getInstance().closeUI("GameEndShareUI",true);
            
        }
    }

    return GameEndShareUILogic;
})(GameEndShareUI);
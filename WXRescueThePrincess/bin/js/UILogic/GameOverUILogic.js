/**
 * 主游戏界面
 */

var GameOverUILogic = (function (_super) {

    function GameOverUILogic() {
        GameOverUILogic.super(this);
    }
    Laya.class(GameOverUILogic, "GameOverUILogic", _super);
    _proto = GameOverUILogic.prototype;

    _proto.isSharing  = false;                                 //是否正在分享

    _proto.onInit = function () {
        this.width = Laya.stage.width;
        this.height = Laya.stage.height;

        this.zOrder = 200;
        
        var scoreNum = SceneManager.getInstance().currentScene.gameScore;
        this.t_score.text = scoreNum;
        this.t_highScore.text = scoreNum;

        var t_titleData = getTitleDataBySocre(scoreNum);
        this.t_title.text = t_titleData.name;
        // this.t_title.color = t_titleData.color;

        //存储在本地并上传
        var highscoreNum = SetLocalMaxScore(scoreNum);
        wxGame.getInstance().uploadUserScore(highscoreNum);

        this.img_high.visible = false;
        if(scoreNum >= highscoreNum){
            this.img_high.visible = true;
        }
        
        //测试显示排行
        // wxGame.getInstance().uploadUserScore(200);
        // if (Browser.onMiniGame) {
        //     wxGame.getInstance().postMessage({
        //         act: "showEndFriends",
        //     }, true);
        // }

        //是否正在分享
        this.isSharing = false;

        this.btn_shared.on(Laya.Event.CLICK,this,this._sharedClickEvent);
        this.btn_playAgain.on(Laya.Event.CLICK,this,this._playAgainClickEvent);
        this.btn_rank.on(Laya.Event.CLICK,this,this._rankClickEvent);
        this.btn_revive.on(Laya.Event.CLICK,this,this._reviveClickEvent);

        this.btn_revive.visible = false;
        if (Browser.onMiniGame){
            if(wxGame.getInstance().videoAd != null){
                this.btn_revive.visible = wxLoadVideoAd;
            }
        }else{
             this.btn_revive.visible = true;
        }

        this.aniShare.play(0, true);

        SceneManager.getInstance().currentScene.isShowVideoAd = false;
        wxGame.getInstance().showAD(1);

    }
    

    _proto.onDestroy = function () {
        // MusicManager.getInstance().stopMusic();
        wxGame.getInstance().showAD(0);
    }
    //复活视频
    _proto._reviveClickEvent = function(){
        if(!this.isSharing){
            if (!Browser.onMiniGame) {
                shareResult(1);
                return;
            }

            var t_videoAd = wxGame.getInstance().videoAd;
            t_videoAd.show().then(function () {
                wxGame.getInstance().showOpenDataContext(false);
                wxGame.getInstance().showAD(0);
            });
            t_videoAd.onClose( function(res){
                t_videoAd.offClose();
                // 用户点击了【关闭广告】按钮
                // 小于 2.1.0 的基础库版本，res 是一个 undefined
                if (res && res.isEnded || res === undefined) {
                    // 正常播放结束，可以下发游戏奖励
                    shareResult(1);
                }
                else {
                    // 播放中途退出，不下发游戏奖励
                    shareResult(0);
                }
            })
        }
    }

    shareResult = function (res) {
        if (res == 1) {
                Gamelog("复活成功");

                UIManager.getInstance().closeUI("GameOverUI",true);
                var scoreNum = SceneManager.getInstance().currentScene.gameScore;
                Gamelog("scoreNum = "+scoreNum);
                SceneManager.getInstance().currentScene.restartGame(scoreNum);
                //开始游戏
                SceneManager.getInstance().currentScene.startGame();

            } else {
                Gamelog("复活失败");
                // UIManager.getInstance().closeUI("GameOverUI",true);
                SceneManager.getInstance().currentScene.restartGame();
                UIManager.getInstance().closeUI("GameOverUI",true);
                UIManager.getInstance().showUI("GameStartUI");
            }
    }

    /**分享游戏 */
    _proto._sharedClickEvent = function () {
        if(!this.isSharing){
            this.isSharing = true;
            // wxGame.getInstance().shareGame();
            wxGame.getInstance().shareScore(SceneManager.getInstance().currentScene.gameScore,this._shareEnd)
        }
    }
    _proto._shareEnd = function(){
        Gamelog("--------------分享结束-------");
        UIManager.getInstance().getUI("GameOverUI").isSharing = false;
    }
    /**重新开始 */
    _proto._playAgainClickEvent = function () {
        if(!this.isSharing){
            wxGame.getInstance().showOpenDataContext(false);
            SceneManager.getInstance().currentScene.restartGame();
            UIManager.getInstance().closeUI("GameOverUI",true);
            UIManager.getInstance().showUI("GameStartUI");
        }
        
    }
    /**点击排行榜 */
    _proto._rankClickEvent = function(){
        UIManager.getInstance().closeUI("GameOverUI");
        UIManager.getInstance().showUI("GameRankUI");
    }

    return GameOverUILogic;
})(GameOverUI);
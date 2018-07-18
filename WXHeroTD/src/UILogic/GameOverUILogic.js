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

        this.zOrder = 200;
        
        var scoreNum = SceneManager.getInstance().currentScene.gameScore;
        this.t_score.text = scoreNum;
        this.t_highScore.text = scoreNum;

        this.t_title.text = getTitleBySocre(scoreNum);

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

        this.btn_shared.on(Laya.Event.CLICK,this,this._sharedClickEvent);
        this.btn_playAgain.on(Laya.Event.CLICK,this,this._playAgainClickEvent);
        this.btn_rank.on(Laya.Event.CLICK,this,this._rankClickEvent);
        
        this.aniShare.play(0, true);

    }
    

    _proto.onDestroy = function () {
        // MusicManager.getInstance().stopMusic();
    }


    /**分享游戏 */
    _proto._sharedClickEvent = function () {
        wxGame.getInstance().shareGame();
    }
    /**重新开始 */
    _proto._playAgainClickEvent = function () {
        wxGame.getInstance().showOpenDataContext(false);
        SceneManager.getInstance().currentScene.restartGame();
        UIManager.getInstance().closeUI("GameOverUI");
        UIManager.getInstance().showUI("GameStartUI");
        
    }
    /**点击排行榜 */
    _proto._rankClickEvent = function(){
        UIManager.getInstance().closeUI("GameOverUI");
        UIManager.getInstance().showUI("GameRankUI");
    }

    return GameOverUILogic;
})(GameOverUI);
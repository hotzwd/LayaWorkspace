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
        this.width = Laya.stage.width;
        this.height = Laya.stage.height;
        
        this.ani1.play(0,true);

        MusicManager.getInstance().playSound("res/music/gameover.ogg");

        this.btn_close.on(Laya.Event.CLICK,this,this._closeClickEvent);
        this.btn_share.on(Laya.Event.CLICK,this,this._shareClickEvent);

        var scoreNum = SceneManager.getInstance().currentScene.gameLevel;
        this.t_gamescore.text = scoreNum;

        //存储在本地并上传
        var highscoreNum = SetLocalMaxScore(scoreNum);
        this.t_highScore.text = highscoreNum;
        wxGame.getInstance().uploadUserScore(highscoreNum);

    }
    
    _proto.onDestroy = function () {
        // MusicManager.getInstance().stopMusic();
        // wxGame.getInstance().showOpenDataContext(false);
    }

    _proto._closeClickEvent = function(){
        MusicManager.getInstance().playSound("res/music/btnclick.ogg");
        SceneManager.getInstance().currentScene.restartGame(true);
        UIManager.getInstance().closeUI("GameOverUI");
        UIManager.getInstance().showUI("GameStartUI");
        // wxGame.getInstance().showOpenDataContext(false);
    }
  
     _proto._shareClickEvent = function(){
        MusicManager.getInstance().playSound("res/music/btnclick.ogg");
        wxGame.getInstance().shareGame();
    }

    return GameOverUILogic;
})(GameOverUI);
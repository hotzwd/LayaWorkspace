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
        
        this.zOrder = 10;
        

        this.btn_close.on(Laya.Event.CLICK,this,this._closeClickEvent);
        this.btn_share.on(Laya.Event.CLICK,this,this._shareClickEvent);

        // this.t_gamescore.text = SceneManager.getInstance().currentScene.gameScore;

        var scoreNum = SceneManager.getInstance().currentScene.gameScore;
        this.t_gamescore.text = scoreNum;

        //存储在本地并上传
        var highscoreNum = SetLocalMaxScore(scoreNum);
        this.t_highScore.text = highscoreNum;
        qqGame.getInstance().uploadUserScore(highscoreNum);

        // var maxScoreNum = highscoreNum;
        // //是否重新上传
        // var uploadScore = LocalStorage.getItem("uploadScore");
        // var uploadScoreNum = 0;
        // if(uploadScore != null && uploadScore != ""){
        //     uploadScoreNum = parseInt(uploadScore, 10);
        // }
        // var maxWorldScoreNum = SetLocalWorldMaxScore(maxScoreNum);
        // //上传世界排行
        // if(maxScoreNum == maxWorldScoreNum || uploadScoreNum == 0){
        //     qqGame.getInstance().sendGameScoreOnWorld(maxWorldScoreNum);
        // }

        qqGame.getInstance().showBannerAD(true);
    }
    
    _proto.onDestroy = function () {
        // MusicManager.getInstance().stopMusic();
        // wxGame.getInstance().showOpenDataContext(false);
        qqGame.getInstance().showBannerAD(false);
    }

    _proto._closeClickEvent = function(){
        MusicManager.getInstance().playSound("res/music/click.wav");
        SceneManager.getInstance().currentScene.restartGame(true);
        UIManager.getInstance().closeUI("GameOverUI",true);
        UIManager.getInstance().showUI("GameStartUI");
        wxGame.getInstance().showOpenDataContext(false);
    }
  
     _proto._shareClickEvent = function(){
        MusicManager.getInstance().playSound("res/music/click.wav");
        qqGame.getInstance().shareGame();
    }

    return GameOverUILogic;
})(GameOverUI);
/**
 * 开始游戏界面
 */

var GameStartUiLogic = (function (_super) {

    function GameStartUiLogic() {
        GameStartUiLogic.super(this);
    }
    Laya.class(GameStartUiLogic, "GameStartUiLogic", _super);
    _proto = GameStartUiLogic.prototype;
     

    _proto.onInit = function () {
        this.width = Laya.stage.width;
        this.height = Laya.stage.height;
        

        this.btn_start.on(Laya.Event.CLICK,this,this._startClickEvent);
        this.btn_rank.on(Laya.Event.CLICK,this,this._rankClickEvent);
        this.btn_share.on(Laya.Event.CLICK,this,this._shareClickEvent);
        this.btn_appRank.on(Laya.Event.CLICK,this,this._appRankClickEvent);

        // this.ani1.play(0, true);
        var t_randomAppId = parseInt(Math.random()* MiniGameData.length);
        this.img_app.skin = MiniGameData[t_randomAppId].icon;

        // wxGame.getInstance().showClubBtn(true);
        qqGame.getInstance().showBannerAD(true);
    }
    
    _proto.onDestroy = function () {
        // MusicManager.getInstance().stopMusic();
    }

    _proto._startClickEvent = function(){
        MusicManager.getInstance().playSound("res/music/click.wav");
        MusicManager.getInstance().playMusic("res/music/1.mp3");
        // wxGame.getInstance().showClubBtn(false);
        qqGame.getInstance().createVideoAD();

        UIManager.getInstance().closeUI("GameStartUI");
        // UIManager.getInstance().showUI("GameUI");

        // SceneManager.getInstance().currentScene.startGame();
        SceneManager.getInstance().currentScene.gameUI.guidBox.visible = true;

        qqGame.getInstance().showBannerAD(false);
    }
    
    _proto._shareClickEvent = function(){
        MusicManager.getInstance().playSound("res/music/click.wav");
        qqGame.getInstance().shareGame();
    }
    _proto._rankClickEvent = function(){
        MusicManager.getInstance().playSound("res/music/click.wav");
        UIManager.getInstance().showUI("GameRankUI");
    }

    _proto._appRankClickEvent = function(){
        MusicManager.getInstance().playSound("res/music/click.wav");
        UIManager.getInstance().showUI("GameRecommendUI");
    }


    return GameStartUiLogic;
})(GameStartUI);
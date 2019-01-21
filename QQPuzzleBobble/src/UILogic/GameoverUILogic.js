/**
 * 结算界面逻辑 by lzq
 */
var GameoverUILogic = (function(_super){
    function GameoverUILogic(){
        GameoverUILogic.super(this);

    }
    Laya.class(GameoverUILogic,"UILogic.GameoverUILogic",_super);
    var _proto = GameoverUILogic.prototype;
    var rankSprite2 = null;
    _proto.bannerAd = null;                                   //横幅广告

    _proto.onInit = function(){
        this.width = Laya.stage.width;
        this.height = Laya.stage.height;
        //设置层级 相对于stage
        this.zOrder = 50;

        this.img_light.rotation = 0;
        var timeLine = new Laya.TimeLine();
        timeLine.addLabel("show",0).to(this.img_light,
        {
            rotation:360
        },4000);
        timeLine.play(0,true);

        var scoreNum = SceneManager.getInstance().currentScene.scoreNum;
        this.label_overScore.text = scoreNum;


         //兼容老版本
        var key = "LocalHighScore_" + GetWeekNum();
        var score = LocalStorage.getItem(key);
        if (score == null || score == "") {
            var t_highScore = LocalStorage.getItem("HighScore");
            if(t_highScore != null || t_highScore != ""){
                if(GetWeekNum() == 10){
                    scoreNum = t_highScore;
                }
            }
        }
         //存储在本地并上传
        var highscoreNum = SetLocalMaxScore(scoreNum);
        
        this.label_heightScore.text = highscoreNum;
        // wxGame.getInstance().uploadUserScore(highscoreNum);
        qqGame.getInstance().uploadUserScore(highscoreNum);

        this.img_light.visible = false;
        if(scoreNum >= highscoreNum){
            this.img_light.visible = true;
        }
        

        this.ani1.play(0, true);

        // this.onGetRankList();

        this.btn_again.on(Laya.Event.CLICK,this,this.onGameAgain);
        this.btn_share.on(Laya.Event.CLICK,this,this.onShareGame);
        // this.btn_closeOver.on(Laya.Event.CLICK,this,this.onCloseGame);
        this.RankList.renderHandler = new Laya.Handler(this, this.updateItem);
        this.RankList.visible = false;

        //this.updateListData();

        //MessageController.getInstance().AddNotification(MessageEventName.RankListEvent,this,this.RankListReceiver);

        // this.showBannerAd();
        qqGame.getInstance().showBannerAD(true);
        qqGame.getInstance().showEndFriendRank();
    }


    _proto.onDestroy = function(){
         qqGame.getInstance().showBannerAD(false);
        //MessageController.getInstance().RemoveNotification(MessageEventName.RankListEvent,this,this.RankListReceiver);
        if(this.bannerAd != null){
            this.bannerAd.destroy();
        }
    }
     
     /**重新开始 */
    _proto.onGameAgain = function(){
        wxGame.getInstance().showOpenDataContext(false);
        UIManager.getInstance().closeUI("GameoverUI",true);
        MusicManager.getInstance().playSound("res/music/1.wav");
        SceneManager.getInstance().currentScene.restartGame(true,0);
        // UIManager.getInstance().showUI('RoomUI');
        // UIManager.getInstance().closeUI("GameUI",true);
        
    }
    /**关闭游戏 */
    _proto.onCloseGame = function(){
        
    }
    /**发送数据 */
    _proto.sendScore = function(highScore){
        wxGame.getInstance().uploadUserScore(highScore);
        
    }

   

    /**初始化数据 */
    _proto.updateRankData = function(_data){
        this.RankList.visible = true;

        this.RankList.scrollTo(0);
        this.RankList.array = _data;
        
    }

    _proto.updateItem = function(cell, index) {
        // Gamelog("index = " + index);
        var rankData = cell._dataSource;


        var rank = index + 1;
        // var rank = rankData.rank + 1;
        if(rankData.rank != null){
            Gamelog("------rankData.rank = " + rankData.rank);
            rank = rankData.rank + 1;
        }

        // var rankIcon = cell.getChildByName("rankIcon");
        var rankIndex = cell.getChildByName("rankIndex");

        rankIndex.visible = true
        rankIndex.text = rank + "";

        // if (rank > 3) {
        //     rankIcon.visible = false;
        //     rankIndex.visible = true
        //     rankIndex.text = rank + "";
        // }
        // else
        // {
        //     rankIcon.skin ="game/No." + rank + ".png";
        //     rankIcon.visible = true;
        //     rankIndex.visible = false;
        // }

        var playerIcon = cell.getChildByName("playerIcon");
        playerIcon.skin = "";
        playerIcon.skin = rankData.url;
        // playerIcon.loadImage(rankData.iconurl);

        var playerName = cell.getChildByName("playerName");
        var str = rankData.nick;
        
        var strNew = str;
        // var strNew = labelTransform(str,playerName.fontSize,playerName.width);
        playerName.text = strNew;
        
        var playerScore = cell.getChildByName("playerScore");
        playerScore.text = rankData.score;

    }

    _proto.onShareGame = function(){
        qqGame.getInstance().shareGame();
        
    }
    return GameoverUILogic;
})(GameoverUI);
/**
 * 结算界面逻辑 by lzq
 */
var GameRankUILogic = (function(_super){
    function GameRankUILogic(){
        GameRankUILogic.super(this);

    }
    Laya.class(GameRankUILogic,"UILogic.GameRankUILogic",_super);
    var _proto = GameRankUILogic.prototype;
    
    _proto.onInit = function(){
        this.width = Laya.stage.width;
        this.height = Laya.stage.height;
        //设置层级 相对于stage
        this.zOrder = 51;

        if (GameInFackBook) {
            FBGame.getInstance().showGloblaRank();
        }


        var data = [];
        this.RankList.vScrollBarSkin = '';
        this.RankList.array = data;
        this.RankList.renderHandler = new Laya.Handler(this, this.updateItem);
        // this.playerList.renderHandler = new Laya.Handler(this,this.onRender);

        this.close.on(Laya.Event.CLICK,this,this.onCloseRank);

        // Gamelog("dataSource =" + this.listName.dataSource);
    }
    _proto.onDestroy = function(){
        //MessageController.getInstance().RemoveNotification(MessageEventName.RankListEvent,this,this.RankListReceiver);
    }

    _proto.updateRankData = function(_dataList){
        // var data = [];
        this.RankList.array = _dataList;
    }
    _proto.updateItem = function(cell, index) {
        // Gamelog("index = " + index);
        var t_data = cell.dataSource;

        var rankIcon = cell.getChildByName("rankIcon");
        rankIcon.skin = "";
        var rankIndex = cell.getChildByName("rankIndex");

        if (t_data.rank > 3) {
            rankIcon.visible = false;
            rankIndex.visible = true;
            rankIndex.text = t_data.rank + "";
        }
        else
        {
            rankIndex.visible = false;
            rankIcon.visible = true;
            rankIcon.skin = "game/img_di"+t_data.rank+".png";
        }
        
        var playerIcon = cell.getChildByName("playerIcon");
        playerIcon.skin = "";
        playerIcon.skin = t_data.icon;

        var playerName = cell.getChildByName("playerName");
        var str = t_data.name;
        var strNew = labelTransform(str,playerName.fontSize,playerName.width);

        // Gamelog(strNew+":"+strNew);
        playerName.text = strNew;
        


        var playerScore = cell.getChildByName("playerScore");
        playerScore.text = t_data.score;
    }

    /**关闭排行 */
    _proto.onCloseRank = function(){
        
        // wxGame.getInstance().showOpenDataContext(false);
        UIManager.getInstance().closeUI("GameRankUI");
        
        MusicManager.getInstance().playSound("res/music/1.wav");
        // SceneManager.getInstance().currentScene.restartGame(0);
    }
    return GameRankUILogic;
})(GameRankUI);
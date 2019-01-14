/**
 * 好友界面逻辑 by lzq
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
        this.zOrder = 50;

        if (GameInQQ) {
            qqGame.getInstance().showFriendRank();
        }

        this.RankList.vScrollBarSkin = '';
        this.RankList.renderHandler = new Laya.Handler(this, this.updateItem);

        this.close.on(Laya.Event.CLICK,this,this.onCloseRank);

        this.RankList.visible = false;
    }
    _proto.onDestroy = function(){
        //MessageController.getInstance().RemoveNotification(MessageEventName.RankListEvent,this,this.RankListReceiver);
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

        // var rank = rankData.rank + 1;
        var rank = index + 1;

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
        
        var strNew = labelTransform(str,playerName.fontSize,playerName.width);
        playerName.text = strNew;
        
        var playerScore = cell.getChildByName("playerScore");
        playerScore.text = rankData.score;

    }

    /**关闭排行 */
    _proto.onCloseRank = function(){
        // MusicManager.getInstance().playSound("res/music/click.wav");
        // wxGame.getInstance().showOpenDataContext(false);
        UIManager.getInstance().closeUI("GameRankUI");
        
    }
    return GameRankUILogic;
})(GameRankUI);
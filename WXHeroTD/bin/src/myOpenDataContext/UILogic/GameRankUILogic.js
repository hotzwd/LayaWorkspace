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
        this.zOrder = 50;


        var data = [];
		for (var i = 0; i < 10; ++i)
		{
			data.push(i);
		}
        this.RankList.vScrollBarSkin = '';
        this.RankList.array = data;
        this.RankList.renderHandler = new Laya.Handler(this, this.updateItem);
        // this.playerList.renderHandler = new Laya.Handler(this,this.onRender);


        this.close.on(Laya.Event.CLICK,this,this.onCloseRank);
    }
    _proto.onDestroy = function(){
        //MessageController.getInstance().RemoveNotification(MessageEventName.RankListEvent,this,this.RankListReceiver);
    }

    _proto.updateItem = function(cell, index) {
        Gamelog("index = " + index);
        var rankIcon = cell.getChildByName("rankIcon");
        if (index > 2) {
            rankIcon.visible = false;
        }
        else
        {
            rankIcon.visible = true;
        }

        var rankIndex = cell.getChildByName("rankIndex");
        rankIndex.text = (index+1).toString();
        if (index <= 2) {
            rankIndex.visible = false
        }
        else
        {
            rankIndex.visible = true
        }
        

        var playerIcon = cell.getChildByName("playerIcon");
        // playerIcon.text = index.toString();

        var playerName = cell.getChildByName("playerName");
        playerName.text = "zhou" + (index + 1);

        var playerScore = cell.getChildByName("playerScore");
        playerScore.text = "1000" + (index + 1);
    }
     
     /**重新开始 */
    _proto.onGameAgain = function(){
        UIManager.getInstance().closeUI("GameoverUI");
        MusicManager.getInstance().playSound("res/music/1.wav");
        SceneManager.getInstance().currentScene.restartGame();
        // UIManager.getInstance().showUI('RoomUI');
        // UIManager.getInstance().closeUI("GameUI",true);
        
    }
    /**关闭排行 */
    _proto.onCloseRank = function(){
        UIManager.getInstance().closeUI("GameRankUI");
    }
    return GameRankUILogic;
})(GameRankUI);
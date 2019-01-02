/**
 * 结算界面逻辑 by lzq
 */
var GameWorldRankUILogic = (function(_super){
    function GameWorldRankUILogic(){
        GameWorldRankUILogic.super(this);

    }
    Laya.class(GameWorldRankUILogic,"UILogic.GameWorldRankUILogic",_super);
    var _proto = GameWorldRankUILogic.prototype;
    
    _proto.curpage = 0;  //当前页数
    _proto.maxpage = 0;  //最大页数

    _proto.onInit = function(){
        this.width = Laya.stage.width;
        this.height = Laya.stage.height;
        //设置层级 相对于stage
        this.zOrder = 51;

        this.curpage = 0;
        this.maxpage = 0;

        this.RankList.vScrollBarSkin = '';
        this.RankList.renderHandler = new Laya.Handler(this, this.updateItem);
        
        this.btn_left.on(Laya.Event.CLICK,this,this.onLeftRank);
        this.btn_right.on(Laya.Event.CLICK,this,this.onRightRank);

        this.close.on(Laya.Event.CLICK,this,this.onCloseRank);

        this.RankList.visible = false;
        this.selfBox.visible = false;

        this.selfBox.getChildByName("playerIcon").skin = "";
        this.selfBox.getChildByName("playerName").text = "";

    }
    _proto.onDestroy = function(){
        
    }
    /**初始化数据 */
    _proto.updateRankData = function(_data){
        this.RankList.visible = true;
        this.selfBox.visible = true;

        this.RankList.scrollTo(0);
        this.RankList.array = _data.info;
        this.curpage = _data.curpage;
        this.maxpage = _data.maxpage;

        this.updateSelfData(parseInt(_data.ownrank),_data.ownscore);
        
    }

    /**更新个人数据 */
    _proto.updateSelfData =function(_rank,_score){

        var cell = this.selfBox;
        var userInfo = loginParams["userInfo"];

        // var rankIcon = cell.getChildByName("rankIcon");
        var rankIndex = cell.getChildByName("rankIndex");

        rankIndex.visible = true;
        rankIndex.text = (_rank + 1) + "";

        if(_rank == -1){
            rankIndex.text = "未上榜";
        }

        // if (_rank > 3) {
        //     rankIcon.visible = false;
        //     rankIndex.visible = true;
        //     rankIndex.text = _rank + "";
        // }
        // else
        // {
        //     if(_rank == -1){
        //         rankIcon.visible = false;
        //         rankIndex.visible = true;
        //         rankIndex.text = "未上榜";
        //     }else{
        //         rankIcon.skin ="game/No." + _rank + ".png";
        //         rankIcon.visible = true;
        //         rankIndex.visible = false;
        //     }
            
        // }


        var playerIcon = cell.getChildByName("playerIcon");
        playerIcon.skin = userInfo.avatarUrl;
        // playerIcon.loadImage(userInfo.avatarUrl);
        

        var playerName = cell.getChildByName("playerName");
        var str = userInfo.nickName;
        
        var strNew = labelTransform(str,playerName.fontSize,playerName.width);
        playerName.text = strNew;
        
        //显示本地存储世界最高分
        var maxWorldScoreNum = SetLocalWorldMaxScore(_score);
        var playerScore = cell.getChildByName("playerScore");
        // playerScore.text = maxWorldScoreNum + "";
        playerScore.text = _score + "";
    }

    _proto.updateItem = function(cell, index) {
        // Gamelog("index = " + index);
        var rankData = cell._dataSource;

        var rank = rankData.rank + 1;

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
        playerIcon.skin = rankData.iconurl;
        // playerIcon.loadImage(rankData.iconurl);

        var playerName = cell.getChildByName("playerName");
        var str = rankData.nickname;
        
        var strNew = labelTransform(str,playerName.fontSize,playerName.width);
        playerName.text = strNew;
        
        var playerScore = cell.getChildByName("playerScore");
        playerScore.text = rankData.max;
    }

    /**关闭排行 */
    _proto.onCloseRank = function(){
        
        UIManager.getInstance().closeUI("GameWorldRankUI",true);
        MusicManager.getInstance().playSound("res/music/click.wav");
    }

    /**上一页 */
    _proto.onLeftRank = function(){

        if(this.curpage > 1){
            wxGame.getInstance().showWorldRank(this.curpage - 1);
        }
    }
    /**下一页 */
    _proto.onRightRank = function(){
        if(this.curpage < this.maxpage){
            wxGame.getInstance().showWorldRank(this.curpage + 1);
        }
    }

    return GameWorldRankUILogic;
})(GameWorldRankUI);
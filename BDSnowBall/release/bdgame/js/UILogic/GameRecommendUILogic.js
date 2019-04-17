/**
 * 游戏榜界面逻辑 by lzq
 */
var GameRecommendUILogic = (function(_super){
    function GameRecommendUILogic(){
        GameRecommendUILogic.super(this);

    }
    Laya.class(GameRecommendUILogic,"UILogic.GameRecommendUILogic",_super);
    var _proto = GameRecommendUILogic.prototype;
    
    _proto.onInit = function(){
        this.width = Laya.stage.width;
        this.height = Laya.stage.height;
        //设置层级 相对于stage
        this.zOrder = 10;

        this.btn_close.on(Laya.Event.CLICK,this,this.onCloseRank);

        this.appList.vScrollBarSkin = '';
        this.appList.renderHandler = new Laya.Handler(this, this.updateItem);

        this.updateMoreGameData();

    }
    _proto.onDestroy = function(){
        //MessageController.getInstance().RemoveNotification(MessageEventName.RankListEvent,this,this.RankListReceiver);
    }

    //更新更多游戏数据
    _proto.updateMoreGameData = function(){
        this.moreGameData = [];
        for (var i = 0; i < MiniGameData.length; i++) {
            var t_element = MiniGameData[i];
            this.moreGameData.push(t_element);
        }
        this.moreGameData.sort(function(a,b){
             return (0.5 - Math.random());
        })
        this.appList.array = this.moreGameData;
    }

    _proto.updateItem = function(cell, index) {
        var rankData = cell._dataSource;

        var appIcon = cell.getChildByName("appIcon");
        var rankIndex = cell.getChildByName("rankIndex");
        rankIndex.text = index + 1;

        rankIndex.color = "#b4b4b4";
        if(index == 0){
            rankIndex.color = "#efcd62";
        }else if(index == 1){
            rankIndex.color = "#c0c1c3";
        }else if(index == 2){
            rankIndex.color = "#ddbe9f";
        }

        appIcon.skin = rankData.icon;

        var appName = cell.getChildByName("appName");
        appName.text = rankData.name;
        
        var appDic = cell.getChildByName("appDic");
        appDic.text = rankData.dic;

        cell.on(Laya.Event.CLICK,this,this.onAppClick,[cell]);
    }

    _proto.onAppClick = function(cell){
        var rankData = cell._dataSource;
        Gamelog("-----跳转App="+rankData.name);
        wxGame.getInstance().jumpToMiniProgram(rankData.appId);
    }
    /**关闭排行 */
    _proto.onCloseRank = function(){
        MusicManager.getInstance().playSound("res/music/click.wav");
        UIManager.getInstance().closeUI("GameRecommendUI");
        
    }
    return GameRecommendUILogic;
})(GameRecommendUI);
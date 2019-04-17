/**
 * 主游戏界面
 */

var GameUILogic = (function (_super) {

    function GameUILogic() {
        GameUILogic.super(this);
    }
    Laya.class(GameUILogic, "GameUILogic", _super);
    _proto = GameUILogic.prototype;
    _proto.scoreLable = null;                                                //分数文字
     

    _proto.onInit = function () {
        this.width = Laya.stage.width;
        this.height = Laya.stage.height;
        
        // this.ani1.play(0,true);
        // this.btn_addLife.visible= true;


        this.guidBox.on(Laya.Event.CLICK,this,this.guidBoxClickEvent);
        // this.btn_addLife.on(Laya.Event.CLICK,this,this.addLifeClick);

        // this.blockList.renderHandler = new Laya.Handler(this, this.updateBlockItem);

        this.curLevel = 0;
        // this.updateBlockData();
        wxGame.getInstance().showClubBtn(false);
        // wxGame.getInstance().showBannerAD(true);
        // this.guidBox.visible = true;
    }
    
    _proto.onDestroy = function () {
        // MusicManager.getInstance().stopMusic();
        // wxGame.getInstance().showBannerAD(false);
    }

    //引导
    _proto.guidBoxClickEvent = function(){
        MusicManager.getInstance().playSound("res/music/click.wav");
        this.guidBox.visible = false;
        SceneManager.getInstance().currentScene.startGame();
    }

    //显示分数
    _proto.setScore = function(p_score,p_anim){
        // Gamelog("-------gamescore="+SceneManager.getInstance().currentScene.gameScore)
        this.scoreLable.text = p_score;
        if(p_anim){
            this.scoreLable.scale(1.2,1.2);
            Laya.Tween.to(this.scoreLable,
            {
                scaleX:1,
                scaleY:1,
            },500,Laya.Ease.elasticOut);
        }
    }


    _proto._shareClickEvent = function(){
        wxGame.getInstance().shareGame();
    }

    //更新图块数据
    _proto.updateBlockData = function(){
        
        var t_level = this.curLevel;
        var t_levelData = LevelData[t_level];

        this.blockList.array = [];
        // this.blockList.destroyChildren();
        // var sp = new Laya.Sprite();
        // sp.destroyChildren();
        this.blockList.repeatX =t_levelData.repeatX;
        this.blockList.repeatY =t_levelData.repeatY;

        var dataList= [];
        for (var i = 0; i < t_levelData.num; i++) {
            var data = [];
            data.width = t_levelData.width;
            data.height = t_levelData.height;
            data.color = this.getRandomColor();

            dataList.push(data);
        }
        
        this.blockList.array = dataList;
        Laya.timer.frameOnce(1,this,function(){
            
            // this.blockList.array = dataList;
        });
        
        this.blockList.repeatX =t_levelData.repeatX;
        this.blockList.repeatY =t_levelData.repeatY;
        this.blockList.width = 660;
        this.blockList.height = 880;
        Gamelog("------this.blockList width="+this.blockList.width);
    }

    /**
     * 刷新图块
     */
    _proto.updateBlockItem = function(cell,index){
        var t_data = cell._dataSource;
        // Gamelog("------this.blockList width="+this.blockList.width);

        var t_width = t_data.width;
        var t_height = t_data.height;

        cell.width = t_width;
        cell.height = t_height;

        var t_sprite = cell.getChildByName("bg");
        t_sprite.width = t_width;
        t_sprite.height = t_height;

        t_sprite.graphics.drawRect(0,0,t_width,t_height,t_data.color);

        var t_Img = cell.getChildByName("icon");
        t_Img.skin ="Game/"+ 1+".png";

        if(t_width >= 220){
            t_Img.width = 220;
        }else{
            t_Img.width = t_width;
        }
        if(t_height>= 220){
            t_Img.height = 220;
        }else{
            t_Img.height = t_height;
        }
        cell.offAll();
        cell.on(Laya.Event.CLICK,this,this.blockClickEvent,[cell,index]);
    }

    //点击色块
    _proto.blockClickEvent = function(event,index){
        Gamelog("------blockClickEvent index="+index);
        this.curLevel ++;
        this.updateBlockData();
    }

    //点击增加生命
    _proto.addLifeClick = function(){
        // MusicManager.getInstance().playSound("res/music/click.wav");
        this.btn_addLife.visible= false;
        // SceneManager.getInstance().currentScene.pauseGame();
        //播放广告
        if (!Browser.onMiniGame) {
            SceneManager.getInstance().currentScene.pauseGame();
            wxGame.getInstance().showVideoAD(SceneManager.getInstance().currentScene,SceneManager.getInstance().currentScene.addLife);
         }else{
             //点击广告
             if(wxGame.getInstance().videoAd == null || !window.wxLoadVideoAd)
                return;
             SceneManager.getInstance().currentScene.pauseGame();
             wxGame.getInstance().showVideoAD(SceneManager.getInstance().currentScene,SceneManager.getInstance().currentScene.addLife);
         }
    }

    //刷新是否可以显示增加生命
    _proto.updateAddLifeState = function(){
        if(Browser.onMiniGame){
            if(wxGame.getInstance().videoAd == null || !window.wxLoadVideoAd)
                return;
            this.btn_addLife.visible = true;
        }else{
            this.btn_addLife.visible = true;
        }
    }
    


    return GameUILogic;
})(GameUI);